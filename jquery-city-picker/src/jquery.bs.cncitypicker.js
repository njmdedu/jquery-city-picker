;(function($, window, document,undefined) {
    var CnCityPicker = function(ele, opt) {
        this.$element = $(ele),
        this.defaults = {
            'province': '',
            'city' : '',
            'district' : '',
            'placeholder': {
                'province':'-请选择-',
                'city':'-请选择-',
                'district':'-请选择-'
              }
        },
        this.options = $.extend({}, this.defaults, opt),
        this.citydata = $.chinaLocationData
    }
    //方法
    CnCityPicker.prototype = {
        init: function() {
            var self = this;
            var $selects = self.$element.find('select');

            $.each(['province', 'city', 'district'], function(i, type){
              self['$'+type] = $selects.eq(i);
            });
            return self;
        },
        bind:function(type){

        }
    }
    //
    $.fn.cncitypicker = function(options) {
        var cncitypicker = new CnCityPicker(this, options);
        return cncitypicker.init();
    }

})(jQuery, window, document);
