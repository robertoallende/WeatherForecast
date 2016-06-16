// Weather Report Directive
weatherApp.directive("weatherReport", function() {
   return {
       restrict: 'E',
       templateUrl: 'weatherReport.html',
       replace: true,
       scope: {
           weatherDay: "=",
           convertToStandard: "&",
           convertToDate: "&",
           dateFormat: "@"
       }
   };
});