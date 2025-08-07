export const API_PATHS = {
  users: {
    base: '/api/users',                             // POST createUser, shared for PATCH/DELETE in future
    exists: '/api/users/exists',                    // GET checkUserExistence
    nzkAvailability: '/api/users/nzk-availability', // GET checkNzkAvailability
    cabinets: {
      base: '/api/users/cabinets',                  // GET / PATCH / DELETE (check / upsert / remove)
    },
  },
  subjects: {
    base: '/api/subjects',                          // POST create • PATCH update
    all: '/api/subjects/all',                       // GET getAllSubjects
    byId: '/api/subjects/by-id',                    // GET | DELETE
    byName: '/api/subjects/by-name',                // GET | DELETE
    bySemester: '/api/subjects/by-sem',             // GET
  },
  works: {
    base: '/api/works',                             // GET by ?id | POST create • PATCH update • DELETE
    bySubjectName: '/api/works/by-sub-name',        // GET
    bySubjectId: '/api/works/by-sub-id',            // GET
  },
} as const;
