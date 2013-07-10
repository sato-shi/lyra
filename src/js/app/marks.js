vde.App.controller('MarksCtrl', function($scope, $rootScope) {
  $scope.marks = ['Rect', 'Symbol'];

  // Cardinal sin
  $(document).ready(function() {
    vde.Vis.parse(); 

      if(vg.keys(vde.Vis._rawData).length == 0)
        vde.Vis.data('olympics', 'http://localhost:8000/data/olympics.json', 'json');
  })
});

vde.App.directive('vdeMarkDroppable', function($rootScope, $location) {
  return function(scope, element, attrs) {
    element.drop(function(e, dd) {
      var markType = $(dd.drag).attr('id');
      if(!markType) return false;

      scope.$apply(function() {
        // Add mark to model, then reparse vega spec
        var group = $rootScope.activeGroup;
        var mark = eval('new vde.Vis.marks["' + markType + '"](undefined, group)');
        vde.Vis.parse();

        // Then route to this mark to load its inspector
        $rootScope.activeVisual = mark;
        $rootScope.activeGroup  = mark.group || mark;
      });
    })
  }
})