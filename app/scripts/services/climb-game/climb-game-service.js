teamunApp.factory('ClimbGameService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
  	userInfo: $resource(DEFAULT_DOMAIN + '/wechats/climb-game/user-info', {code: '@code'}),
    ranking: $resource('http://api.teamun.com/v1.0.3/wechat-game-records', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    register: $resource('http://api.teamun.com/v1.0.3/wechat-game-users', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    })
  };
});
