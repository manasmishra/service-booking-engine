const moment = require("moment");
const { CAPACITY_PER_SLOT } = require("../constants");

// Define our state and initialize it
const db = {};
let capacityPerSlot = 0;

function getSlotForThatDD(YYYY, MM, DD) {
  let slotsByDD;
  if (!db[YYYY]) {
    db[YYYY] = {
      [MM]: {
        [DD]: {},
      },
    };
    slotsByDD = db[YYYY][MM][DD];
  } else {
    const year = db[YYYY];
    if (!year[MM]) {
      year[MM] = {
        [DD]: {},
      };
      slotsByDD = year[MM][DD];
    } else {
      const month = year[MM];
      if (!month[DD]) {
        month[DD] = {};
        slotsByDD = month[DD];
      } else {
        slotsByDD = month[DD];
      }
    }
  }
  return slotsByDD;
}

function checkIfDateisWithinWorkingHours(
  momentDateTime,
  momentDateTimeEnd,
  YYYY,
  MM,
  DD
) {
  const dayStartTimeMoment = moment(
    `${YYYY}/${MM}/${DD} 09:00`,
    "YYYY/MM/DD HH:mm"
  );
  const dayEndTimeMoment = moment(
    `${YYYY}/${MM}/${DD} 17:00`,
    "YYYY/MM/DD HH:mm"
  );
  if (
    momentDateTime.isBefore(dayStartTimeMoment) ||
    momentDateTimeEnd.isAfter(dayEndTimeMoment)
  ) {
    return false;
  }
  return true;
}

// Define the functions that will expose that state
const model = {
  setCapacity: async (capacity = CAPACITY_PER_SLOT) => {
    capacityPerSlot = capacity > capacityPerSlot ? capacity : capacityPerSlot;
    return capacityPerSlot;
  },
  getDB: async () => db,
  resetCapacityToDefault: async () => {
    capacityPerSlot = CAPACITY_PER_SLOT;
    return capacityPerSlot;
  },
  getCapacity: async () => capacityPerSlot,
  bookSlot: async (vehicle, user, dateTime) => {
    // const flag = 3; // 0 -outside booking hours, 1 - exceeds capacity 2 - got a slot
    const momentDateTime = moment(dateTime, "YYYY/MM/DD HH:mm");
    const YYYY = momentDateTime.year();
    const MM = momentDateTime.month() + 1;
    const DD = momentDateTime.date();
    const HH = momentDateTime.hour();
    const mm = momentDateTime.minute();
    const momentDateTimeEnd = moment(dateTime, "YYYY/MM/DD HH:mm").add(
      2,
      "hours"
    );
    const slotTime = `${HH}:${mm}`;
    const slotsByDD = getSlotForThatDD(YYYY, MM, DD);
    if (
      checkIfDateisWithinWorkingHours(
        momentDateTime,
        momentDateTimeEnd,
        YYYY,
        MM,
        DD
      )
    ) {
      for (let i = 1; i <= capacityPerSlot; i += 1) {
        if (!slotsByDD[i]) {
          slotsByDD[i] = [
            {
              [slotTime]: {
                vehicle,
                user,
                slotTime,
              },
            },
          ];
          return true;
        }
        const slots = slotsByDD[i];
        // iterate to see if any vacant slot there slots are kept in increasing order based on slotTime
        if (slots.length) {
          for (let j = 0; j < slots.length; j += 1) {
            const currSlot = slots[j];
            const [currSlotTime] = Object.keys(currSlot);
            const currSlotDateTime = `${YYYY}/${MM}/${DD} ${currSlotTime}`;
            const momentCurrSlotDateTime = moment(
              currSlotDateTime,
              "YYYY/MM/DD HH:mm"
            );
            const momentCurrSlotDateTimeEnd = moment(
              currSlotDateTime,
              "YYYY/MM/DD HH:mm"
            ).add(2, "hours");
            // if reqSlotTime + 2hr < currSlotTime then also insert requested slot in current position
            // or if reqSlotTime > currSlotTime+2 hr && j === slotLength -1 then also insert requested slot at end of array
            if (
              momentDateTimeEnd.isSameOrBefore(momentCurrSlotDateTime) ||
              (momentDateTime.isSameOrAfter(momentCurrSlotDateTimeEnd) &&
                j === slots.length - 1)
            ) {
              slots.splice(j + 1, 0, {
                [slotTime]: {
                  slotTime,
                  vehicle,
                  user,
                },
              });
              return true;
            }
            // else no slots empty
          }
          if (i === capacityPerSlot) {
            return false;
          }
          // eslint-disable-next-line no-continue
          continue;
        }
        // insert req slot in start of slots array as no slots are booked yet
        slots.push({
          [slotTime]: {
            slotTime,
            vehicle,
            user,
          },
        });
        return true;
      }
    }
    return false;
  },
  getBookingsByDate: async (dateMoment) => {
    const YYYY = dateMoment.year();
    const MM = dateMoment.month() + 1;
    const DD = dateMoment.date();
    return db[YYYY] && db[YYYY][MM] && db[YYYY][MM][DD];
  },
};

// Disallow new properties on our object
Object.freeze(model);

module.exports = {
  model,
};
