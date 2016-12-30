;(function($, window, document,undefined) {
    var CnCityPicker = function(ele, opt) {
        this.$element = $(ele),
        this.defaults = {
            province: '',
            city : '',
            district : '',
            placeholder: {
                'province':'-请选择-',
                'city':'-请选择-',
                'district':'-请选择-'
              },
            onProvinceChange:function(){

            }
        },
        this.options = $.extend({}, this.defaults, opt),
        this.citydata = $.chinaLocationData;
        this.pcd ={
          'provinces' : [],
          'citys' : [],
          'districts' : []
        }
    }
    //方法
    CnCityPicker.prototype = {
        init: function() {
            var self = this;
            var $selects = self.$element.find('select');

            $.each(['province', 'city', 'district'], function(i, type){
              self['$'+type] = $selects.eq(i);
            });
            self.event();
            self.reset();
            return self;
        },
        event: function(){
          var self = this;
          if (self.$province) {
            self.$province.on('change.cncitypicker', (self.onChangeProvince = $.proxy(function(){
              self.output('city');
              self.output('district');
              // todo:事件
              // self.$province.onProvinceChange=function(){
              //
              // };
            }, self)));
          }

          if (self.$city) {
            self.$city.on('change.cncitypicker', (self.onChangeCity = $.proxy(function(){
              self.output('district');
            }, self)));
          }
        },
        removeEvent: function() {
          var self = this;

          if (self.$province) {
            self.$province.off('change.cncitypicker');
          }

          if (self.$city) {
            self.$city.off('change.cncitypicker');
          }
        },
        output: function(type){
          var self = this;
          var options = self.options;
          var citydata = self.citydata;
          var $select = self['$'+type];
          var code;

          if (!$select || !$select.length) {
            return;
          }

          switch (type) {
            case 'province':
              code = 0;
              break;
            case 'city':
              code = self.$province && (self.$province.find(':selected').data('code') || '');
              break;
            case 'district':
              code = self.$city && (self.$city.find(':selected').data('code') || '');
              break;
          }

          var cncity = self.getCityList(type,code);
          var placeholder = self.options.placeholder[type];
          if (placeholder) {
            cncity.unshift({
              code: '',
              name: placeholder,
              selected: true
            });
          }

          if (cncity.length) {
            $select.html(self.getDomList(cncity));
          } else {
            $select.empty();
          }
        },
        getDomList:function(data){
          const options = this.options;
          const list = [];

          $.each(data, function(i, n){
            const attrs = [
              'data-code="' + n.code + '"',
              'data-text="' + n.name + '"',
              'value = "' + n.name + '"'
            ];
            if (n.selected) {
              attrs.push('selected');
            }
            list.push('<option '+ attrs.join(' ') + '>'+ n.name +'</option>');
          });
          return list.join('');
        },
        reset:function(){
          const self = this;

          self.output('province');
          self.output('city');
          self.output('district');
        },
        getCityList:function(type, code) {
          var self = this;
          code = code || 110000;
          var data = [];
          switch (type) {
            case 'province':
              $.each(self.citydata,function(index, obj){
                data.push({
                  name : obj.name,
                  code : obj.code,
                  sub : obj.sub,
                  selected: obj.code == code
                });

              })
              self.pcd.provinces = data;
              break;
            case 'city':
              $.each(self.pcd.provinces,function(index, obj){
                if(obj.code == code){
                  data = obj.sub;
                }
              })
              self.pcd.citys = data;
              break;
            case 'district':
              $.each(self.pcd.citys,function(index, obj){
                if(obj.code == code){
                  data = obj.sub;
                }
              })
              self.pcd.districts = data;
              break;
          }
          return data;
        },
        destory:function(){

        }
    }

    $.fn.cncitypicker = function(options) {
        var cncitypicker = new CnCityPicker(this, options);
        return cncitypicker.init();
    }
})(jQuery, window, document);
