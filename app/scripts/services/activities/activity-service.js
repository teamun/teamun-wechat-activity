teamunApp.factory('ActivityService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    activityList: $resource(DEFAULT_DOMAIN + '/wechats/activities/list/:openid', {openid: '@openid'}),
    joinList: $resource(DEFAULT_DOMAIN + '/wechats/activities/activity-join-list/:activity_id', {activity_id: '@activity_id'}),
    activity: $resource(DEFAULT_DOMAIN + '/wechats/activities/detail/:activity_id', {activity_id: '@activity_id', code: '@code'}),
    saveActivity: $resource(DEFAULT_DOMAIN + '/wechats/activities/activity-save', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    joinActivity: $resource(DEFAULT_DOMAIN + '/wechats/activities/activity-join', {activity_id: '@activity_id'}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    quit: $resource(DEFAULT_DOMAIN + '/wechats/activities/activity-quit', {openid: '@openid', activity_id: '@activity_id', join_id: '@join_id'}, {
      remove: {
        method: "DELETE"
      }
    }),
    remove: $resource(DEFAULT_DOMAIN + '/wechats/activities/activity-remove', {openid: '@openid', myactivities: '@myactivities'}, {
      remove: {
        method: "DELETE"
      }
    })
  };
});
