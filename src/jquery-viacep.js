;(function ($, undefined) {

    var defaults = {
        fields : {
            logradouro: '[data-viacep-endereco], .viacep-endereco',
            bairro: '[data-viacep-bairro], .viacep-bairro',
            localidade: '[data-viacep-cidade], .viacep-cidade',
            uf: '[data-viacep-estado], .viacep-estado',
            cep: '[data-viacep-cep], .viacep-cep'
        },
        apiUrl: 'https://viacep.com.br/ws/%s/json/'
    };

    var events = {
        plugin_init: 'viacep.plugin.init',
        ajax_start: 'viacep.ajax.before',
        ajax_complete: 'viacep.ajax.after',
        ajax_error: 'viacep.ajax.error',
        ajax_success: 'viacep.ajax.success'
    };

    function Plugin( element, options ) {
        this.$form = $( element );
        this.options = $.extend( {}, defaults, options );
        this.currentZipCode = null;
        this.requesting = false;
        this.init();
    }

    Plugin.prototype.init = function () {
        var _self = this;

        this.dispatch(events.plugin_init);

        this.$form.find(this.options.fields.cep).on('change blur keyup', function (e) {
            var zipcode = $(this).val().replace(/[^0-9]/g, '');

            if (!(zipcode && _self.currentZipCode !== zipcode && zipcode.length === 8 && !_self.requesting)) return;

            _self.requesting = true;
            _self.currentZipCode = zipcode;
            _self.requestAddressFor(zipcode);
        });
    };

    Plugin.prototype.requestAddressFor = function (zipcode) {
        var _self = this, request;

        this.$form.trigger(events.ajax_start);

        request = $.getJSON(this.options.apiUrl.replace(/%s/, zipcode), function (response) {
            _self.bindValues(response);
            _self.dispatch(events.ajax_success, response);
        });

        request.fail(function (jqxhr, textStatus, error) {
            _self.currentZipCode = null;
            _self.dispatch(events.ajax_error, {
                jqxhr: jqxhr,
                textStatus: textStatus,
                error: error
            });
        });

        request.always(function () {
            _self.requesting = false;
            _self.dispatch(events.ajax_complete);
        });
    };

    Plugin.prototype.bindValues = function (data) {
        for (var prop in this.options.fields) {
            this.$form.find(this.options.fields[prop]).val(data[prop]).trigger('change');
        }
    };

    Plugin.prototype.dispatch = function (event, data) {
        this.$form.trigger(event, data);
    };

    $.fn.ViaCep = function ( options ) {
        return this.each(function () {
            if ( ! $.data( this, "plugin" ) ) {
                $.data( this, "plugin", new Plugin( this, options ) );
            }
        });
    };

    $(document).ready(function () {
        $('[data-viacep]').ViaCep();
    });
})( jQuery, undefined );