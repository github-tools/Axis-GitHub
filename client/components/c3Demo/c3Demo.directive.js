'use strict';

angular.module('axismakerApp')
  .directive('c3Demo', function ($timeout) {
    return {
      templateUrl: 'components/c3Demo/c3Demo.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var chart = c3.generate({
            data: {
                columns: [
                  ['data1', 120, 140, 170, 150, 180],
                  ['data2', 80, 50, 100, 70, 120],
                  ['data3', 180, 120]
                ],
                type: 'line'
            }
        });

        $timeout(function () {
            chart.load({
                columns: [
                  ['data1', 20, 40, 70, 50, 80],
                  ['data2', 180, 150, 120, 170, 200],
                  ['data3', 400, 310, 470, 400, 380]
                ]
            });
        }, 1000);

        $timeout(function () {
            chart.load({
                columns: [
                    ['data1', 130, 120, 150, 140, 160, 150],
                    ['data4', 30, 20, 50, 40, 60, 50],
                ],
                unload: ['data2', 'data3'],
            });
        }, 2000);

        $timeout(function () {
            chart.load({
                rows: [
                    ['data2', 'data3'],
                    [120, 300],
                    [160, 240],
                    [200, 290],
                    [160, 230],
                    [130, 300],
                    [220, 320],
                ],
                unload: 'data4',
            });
        }, 3000);

        $timeout(function () {
            chart.load({
                columns:[
                    ['data4', 30, 20, 50, 40, 60, 50,100,200]
                ],
                type: 'bar'
            });
        }, 4000);

        $timeout(function () {
            chart.unload({
                ids: 'data4'
            });
        }, 5000);

        $timeout(function () {
            chart.load({
                columns:[
                    ['data2', null, 30, 20, 50, 40, 60, 50]
                ]
            });
        }, 6000);

        $timeout(function () {
            chart.unload();
        }, 7000);

        $timeout(function () {
            chart.load({
                rows: [
                    ['data4', 'data2', 'data3'],
                    [90, 120, 300],
                    [40, 160, 240],
                    [50, 200, 290],
                    [120, 160, 230],
                    [80, 130, 300],
                    [90, 220, 320],
                ],
                type: 'bar'
            });
        }, 8000);

        $timeout(function () {
            chart.load({
                rows: [
                    ['data5', 'data6'],
                    [190, 420],
                    [140, 460],
                    [150, 500],
                    [220, 460],
                    [180, 430],
                    [190, 520],
                ],
                type: 'line'
            });
        }, 9000);

        $timeout(function () {
            chart.unload({
                ids: ['data2', 'data3']
            });
        }, 10000);
      }
    };
  });
