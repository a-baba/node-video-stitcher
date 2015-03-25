
define(['$component'], function (app) {

    app.directive("dropFile", function () {
        return {

            link: function($scope, element, attr) {

                element[0].addEventListener("drop", function(evt) {

                    console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)));

                    evt.stopPropagation();

                    evt.preventDefault();

                    var reader = new FileReader();

                    reader.onload = function(){

                        console.log(reader.result);
                        $scope[attr['ngModel']] = reader.result;
                        $scope.$digest();
                    };

                    reader.readAsText(evt.dataTransfer.files[0]);

                }, false)
            }
        }
    });
});
