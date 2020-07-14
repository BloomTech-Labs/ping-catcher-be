const db = require('../database/db-config');
const Events = require('./eventsModel');

describe('events model', () => {
  describe('insert', () => {
    it('should insert events into the db', async () => {
      await Events.add({text: "testing"});

      const addedEvents = await db('events')
      expect(addedEvents).toHaveLength(1);
    });

    it('should insert event into the db', async () => {
      let event = await Events.add({text: "Testing the testing database"})
      expect(event.text).toBe('Testing the testing database')
    })
  })
})