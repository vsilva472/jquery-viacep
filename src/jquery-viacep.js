;(function ($, undefined) {

    var events = {
        ajax_start: 'viacep.ajax.before',
        ajax_complete: 'viacep.ajax.complete',
        ajax_error: 'viacep.ajax.error',
        ajax_success: 'viacep.ajax.success',
        response_error: 'viacep.response.error',
    };

    function Plugin( element, options ) {
        this.$form = $( element );
        this.options = $.extend( {}, $.fn.viacep.defaults, options );
        this.currZipcode = null;
        this.isRequesting = false;
        this.apiUrl = 'https://viacep.com.br/ws/%s/json/';
        this.init();
    }

    Plugin.prototype.init = function () {
        var _self = this;

        this.$form.find( this.options.field_cep ).on( 'change blur keyup', function ( e ) {
            var zipcode = $( this ).val().replace( /[^0-9]/g, '' );

            if ( ! ( zipcode && _self.currZipcode !== zipcode && zipcode.length === 8 && !_self.isRequesting ) ) return;

            _self.isRequesting = true;
            _self.currZipcode = zipcode;
            _self.dispatch( events.ajax_start, { zipcode: zipcode } ).makeRequest( zipcode );
        });
    };

    Plugin.prototype.makeRequest = function ( cep ) {
        var _self = this, zipcode = cep, endpoint =  this.apiUrl.replace( /%s/, zipcode ),

        isResponseValid = function ( response ) {
            if ( ! response.error ) return true;

            _self.dispatch( events.response_error, {
                zipcode: zipcode,
                msg: 'Endereço não encontrado.',
                response: response
            });

            return false;
        },

        onSuccess = function ( response ) {
            if ( ! isResponseValid( response ) ) return;
             
            _self.bind( response );
            _self.dispatch( events.ajax_success, response );
        }, 

        onError = function ( jqxhr, textStatus, error ) {
            _self.current_zipcode = null;
            _self.dispatch( events.ajax_error, {
                jqxhr: jqxhr,
                textStatus: textStatus,
                error: error,
                zipcode: zipcode
            });
        }, 

        onComplete = function () {
            _self.isRequesting = false;
            _self.dispatch( events.ajax_complete, { zipcode: zipcode } );
        };

        $.getJSON( endpoint, onSuccess ).fail( onError ).always( onComplete );
    };

    Plugin.prototype.bind = function ( data ) {
        for ( var prop in data ) {
            if ( prop == 'cep' ) continue;

            this.$form
                .find( this.options[ 'field_' + prop ] )
                .val( data[ prop ] ).trigger( 'change' );
        }
    };

    Plugin.prototype.dispatch = function ( event, data ) {
        this.$form.trigger( event, data );
        return this;
    };

    $.fn.viacep = function ( options ) {
        return this.each( function () {
            if ( ! $.data( this, "plugin" ) ) {
                $.data( this, "plugin", new Plugin( this, options ) );
            }
        });
    };

    $.fn.viacep.defaults = {
        container : '[data-viacep]',
        field_logradouro: '[data-viacep-endereco], .viacep-endereco',
        field_bairro: '[data-viacep-bairro], .viacep-bairro',
        field_localidade: '[data-viacep-cidade], .viacep-cidade',
        field_uf: '[data-viacep-estado], .viacep-estado',
        field_cep: '[data-viacep-cep], .viacep-cep'
    };

    $( document ).ready( function () {
        $($.fn.viacep.defaults.container).viacep();
    });
})( jQuery, undefined );