# jQuery ViaCEP
[![license](https://img.shields.io/github/license/vsilva472/jquery-viacep.svg?style=flat-square)](https://github.com/vsilva472/jquery-viacep/blob/master/LICENSE) [![Release](https://img.shields.io/github/release/vsilva472/jquery-viacep.svg?style=flat-square)](https://github.com/vsilva472/jquery-viacep/releases) [![](https://data.jsdelivr.com/v1/package/npm/@vsilva472/jquery-viacep/badge)](https://www.jsdelivr.com/package/npm/@vsilva472/jquery-viacep)  [![npm](https://img.shields.io/npm/dm/@vsilva472/jquery-viacep.svg?style=flat-square)](https://www.npmjs.com/package/@vsilva472/jquery-viacep)

Um plugin jQuery para autocompletar endereços a partir de um CEP utilizando a api do site [ViaCEP](https://viacep.com.br) com ~1,6Kb.  
Elaborado de forma não intrusiva, ou seja, não é necessário alterar o código existente da aplicação. 

Compatível com gerenciadores de Tags (como Google Tagmanager) e com suporte a múltiplos forms na mesma página.
Compatível ainda com vários CMSs e Frameworks (Laravel, WooCommerce e etc).

## Conteúdo
- [Suporte de browser](#suporte-de-browser)
- [Instalação](#instalação)
  - [Via Git](#instalação-via-git)
  - [NPM](#instalação-via-npm)
  - [Composer](#instalação-via-composer)
  - [CDN](#instalação-via-CDN)
- [Opções padrão](#opções-padrão)
- [Instruções de uso](#instruções-de-uso)
  - [Via data-attributes](#usando-com-seletores-padrão-via-data-attributes)
  - [Via classes css](#usando-com-seletores-padrão-via-classes-css)
  - [Seletores mistos](#usando-com-seletores-mistos)
  - [Uso com jQuery Mask](#uso-em-conjunto-com-jquery-mask)
- [Eventos](#eventos)
- [Exemplos avançados](#exemplos-avançados)
  - [Exibindo loading](#exibindo-loading)
  - [Bloqueando FORM durante o loading](#bloqueando-form-durante-o-loading)
  - [Bloquear campos autocompletados](#bloquear-campos-autocompletados)
  - [Dropdown de estados sem UF](#dropdown-de-estados-sem-uf)
  - [Integrando com Laravel](#integrando-com-laravel)
  - [Integrando com Google Analytics](#integrando-com-google-analytics)
  - [Integrando com Google TagManager](#integrando-com-google-tagmanager)
  - [Integrando com Select2](#integrando-com-select2)
  - [Campos gia, ibge, unidade e complemento](#campos-gia-ibge-unidade-e-complemento)
- [Apoie o projeto](#apoie)

## Suporte de Browser

![Internet Explorer](https://user-images.githubusercontent.com/4265802/60848376-bf7bdc80-a1bc-11e9-89db-5637ebad0352.png) | ![Chrome](https://user-images.githubusercontent.com/4265802/60848375-bee34600-a1bc-11e9-82bd-ab65ee37dd52.png) | ![Firefox](https://user-images.githubusercontent.com/4265802/60848374-bee34600-a1bc-11e9-84d3-7338811bf48d.png) | ![Opera](https://user-images.githubusercontent.com/4265802/60848373-bee34600-a1bc-11e9-9eb0-f72e9a75a14b.png) | ![Safari](https://user-images.githubusercontent.com/4265802/60848372-be4aaf80-a1bc-11e9-8c4e-680f7c0f21e4.png)
--- | --- | --- | --- | --- |
IE 10+ ✔ | Último ✔ | Último ✔ | Último ✔ | Último ✔ |

## Instalação

##### Instalação via GIT
`git clone git@github.com:vsilva472/jquery-viacep.git` (SSH)  ou  
`git clone https://github.com/vsilva472/jquery-viacep.git` (HTTPS)

##### Instalação via NPM
`npm i @vsilva472/jquery-viacep`

##### Instalação via Composer
`composer require vsilva472/jquery-viacep`

##### Instalação via CDN
[https://www.jsdelivr.com/package/npm/@vsilva472/jquery-viacep](https://www.jsdelivr.com/package/npm/@vsilva472/jquery-viacep)  

`<script src="https://cdn.jsdelivr.net/npm/@vsilva472/jquery-viacep@1/dist/jquery-viacep.min.js"></script>`



## Opções padrão
```javascript
$.fn.viacep.defaults = {
	container : '[data-viacep]',
	field_logradouro: '[data-viacep-endereco], .viacep-endereco',
	field_bairro: '[data-viacep-bairro], .viacep-bairro',
	field_localidade: '[data-viacep-cidade], .viacep-cidade',
	field_uf: '[data-viacep-estado], .viacep-estado',
	field_cep: '[data-viacep-cep], .viacep-cep'
};
```

Atributo | Tipo | Padrão | Descrição
--- | --- | --- | --- |
container | String | `'[data-viacep]'` | Seletor do container dos campos (geralmente a tag `<form>`)
field_logradouro| String | `'[data-viacep-endereco], .viacep-endereco'` | Seletor para o campo Endereço do form
field_bairro | String | `'[data-viacep-bairro], .viacep-bairro'` | Seletor para o campo bairro do form
field_localidade | String | `'[data-viacep-cidade], .viacep-cidade'` | Seletor para o campo Cidade do form
field_uf | String | `'[data-viacep-estado], .viacep-estado'` | Seletor para o campo Estado do form
field_cep | String | `'[data-viacep-cep], .viacep-cep'` | Seletor para o campo CEP do form

Se seu projeto possui vários formulários e todos são padronizados, talvez seja mais prático para você alterar as opções padrão globalmente, dessa forma basta incluir o arquivo com as opções preenchidas e o plugin se encarregará do resto.

```javascript
// arquivo vicep.configs.js
$.fn.viacep.defaults = {
    container: '.form',
    field_logradouro: '.logradouro',
    field_bairro: '.bairro',
    field_localidade: '.cidade',
    field_uf: '.estado',
    field_cep: '.cep'
};

$('.form').viacep();
```


## Instruções de uso
### Usando com seletores padrão via *data-attributes*
```html
<form data-viacep>
    <input name="cep" data-viacep-cep>
    <input name="endereco" data-viacep-endereco>
    <input name="bairro" data-viacep-bairro>
    <input name="cidade" data-viacep-cidade>
    <input name="estado" data-viacep-estado>
</form>
```

**Nota** Se você utilizar os seletores padrão definidos em `$.fn.viacep.defaults` inalterados, não é necessário a chamada do plugin `$('selector').viacep(options)`, pois o plugin já se auto instancia com essas opções.

### Usando com seletores padrão via classes *CSS*
```html
<form class="form">
    <input name="cep" class="viacep-cep">
    <input name="endereco" class="viacep-endereco">
    <input name="bairro" class="viacep-bairro">
    <input name="cidade" class="viacep-cidade">
    <input name="estado" class="viacep-estado">
</form>

<script>
$('.form').viacep();
</script>
```

### Usando com seletores *mistos*
O plugin é flexível o suficiente para misturar seletores padrão com personalizados.  
O exemplo abaixo usa os seletores padrão de classe css para o campo `bairro` e o seletor padrão de `data-attribute` para o campo `cidade` e seletores personalizados para os demais campos.
```html
<form name="cadastro-pessoa">
    <input name="cep" class="cep">
    <input name="endereco"  data-endereco-personalizado>
    <input name="bairro" class="viacep-bairro">
    <input name="cidade" data-viacep-cidade>
    <input name="estado" id="uf">
</form>
                                
<script>
$('[name="cadastro-pessoa"]').viacep({
    field_logradouro: '[data-endereco-personalizado]',
    field_uf: '#uf',
    field_cep: '.cep'
});
</script>
```

**Nota** A chamada para o plugin __deve ser feita em uma tag que englobe os campos__ a serem auto completados (geralmente na tag `<form>`).

### Uso em conjunto com jQuery Mask

Este plugin não faz bind de valores no campo de cep, isto torna jquery-viacep um plugin compatível com outros plugins de máscaras como por exemplo o [jQuery Mask](https://igorescobar.github.io/jQuery-Mask-Plugin/) de forma nativa.

Entretanto caso você precise/deseje fazer alguma programação customizada na(s) máscara(s) do(s) campo(s) antes e/ou depois de receber os dados da api, você pode estar consultando a [api de eventos](#eventos) e identificar qual melhor evento se adapta a sua necessidade de customização da máscara.

```html
<form data-viacep>
    <input type="text" name="cep" class="cep" data-viacep-cep>
	(...)
</form>

<script>
$('.cep').mask('00000-000');
</script>
```

## Eventos
O plugin possui uma poderosa api de eventos que o torna extensível e flexível o suficiente para ser integrável em qualquer sistema que possua `jQuery` instalado.

Evento | Descrição | Argumentos
--- | --- | --- |
`viacep.plugin.init` | Disparado logo após o plugin ser iniciado em um elemento | `NULL`
`viacep.ajax.before` | Disparado antes de efetuar a requisição para api do viaCEP | `NULL`
`viacep.ajax.complete` | Disparado no final do ciclo da requisição independente se a mesma foi obteve sucesso ou erro. | `NULL`
`viacep.ajax.error` | Disparado quando ocorre um erro na requisição (400, 500  etc.) | `jqxhr, textStatus, error`
`viacep.ajax.success` | Disparado quando a requisição é feita com sucesso e após os bind dos valores nos campos | `response` completo incluindo os campos `unidade`, `ibge` e `gia` da api do ViaCEP
`viacep.response.error` | Disparado quando a requisição foi feita com sucesso porém o objeto json da resposta da api contém o atributo `error` | `cep, msg, response`
 
 
## Exemplos avançados
Veja abaixo algumas aplicações avançadas do plugin utilizando a api de eventos do plugin.

### Exibindo loading

```html
<style>
.hide { display: none; }
</style>
<span class="hide loading">Aguarde...</span>
<form data-viacep>
    <input name="cep" data-viacep-cep>
    <input name="endereco" data-viacep-endereco>
    <input name="bairro" data-viacep-bairro>
    <input name="cidade" data-viacep-cidade>
    <input name="estado" data-viacep-estado>
</form>

<script>
$("[data-viacep]").on('viacep.ajax.before viacep.ajax.complete', function () {
    $(this).find('.loading').toggleClass('hide');
});
</script>
```

### Bloqueando FORM durante o loading
As vezes faz-se necessário bloquear o `form` durante a requisição para evitar múltiplas requisições. O exemplo abaixo ilustra essa situação.
```html
<form id="form-1" data-viacep>
    <fieldset>
        <legend class="sr-only">Endereço</legend>
        <input name="cep" data-viacep-cep>
        <input name="endereco" data-viacep-endereco>
        <input name="bairro" data-viacep-bairro>
        <input name="cidade" data-viacep-cidade>
        <input name="estado" data-viacep-estado>
    </fieldset>
</form>

<script>
$('#form-1').on('viacep.ajax.before', function () {
    //$(this).find('.loading').removeClass('hide');
    $(this).find('fieldset').attr('disabled', true);
})
.on( 'viacep.ajax.complete', function () {
    //$(this).find('.loading').addClass('hide');
    $(this).find('fieldset').removeAttr('disabled');
});
</script>
```

### Bloquear campos autocompletados
Algumas vezes devido a uma regra de negócio, não desejamos permitir que o usuário altere os campos depois que foram preenchidos. O exemplo abaixo ilustra esta situação deixando apenas o campo número liberado para preenchimento.

```html
<form id="form-2" data-viacep>
    <input name="cep" data-viacep-cep>
    <input name="endereco" data-viacep-endereco>
    <input name="numero">
    <input name="bairro" data-viacep-bairro>
    <input name="cidade" data-viacep-cidade>
    <input name="estado" data-viacep-estado>
</form>

<script>
$('#form-2').on( 'viacep.ajax.complete', function () {
    var $this = $( this ), fields_to_block = ['cep', 'endereco', 'bairro', 'cidade', 'estado'];

    fields_to_block.forEach(function (name) {
        $this.find('[name="' + name + '"]').attr('disabled', true);
    });
});
</script>
```

### Dropdown de estados sem UF
Por padrão o plugin tentará setar o valor do campo estado com o atributo `uf` da resposta da api. Isto funcionará normalmente caso o campo `estado` seja um campo de texto ou seja um `<select>` com `<option value="UF">`.

Alguns projetos utilizam o nome do estado ao invés da `uf` nos `<option>`. O exemplo abaixo ilustra como proceder nesse caso.

```html
<form id="form-3" data-viacep>
    <!-- (...) Outros campos -->
    <select name="estado" data-viacep-estado id="estado">
        <option value="Rio de Janeiro">Rio de Janeiro</option>
        <option value="São Paulo">São Paulo</option>
        <!-- Restante dos <option> aqui -->
    </select>
</form>

<script>
$('#form-3').on( 'viacep.ajax.success', function (e, response) {
    $(this).find('#estado').val(response.localidade).trigger('change');
});
</script>
```

### Integrando com Laravel
Em frameworks como laravel é comum por questões de segurança a existência de um `CSRF-TOKEN` para evitar ataques, e por uma questão de comodidade geralmente já inserimos o header `X-CSRF-TOKEN` nas requisições ajax com um script do tipo:
```javascript
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
``` 

Porém a api do viaCEP não completa a requisição se este header estiver presente. O exemplo abaixo ilustra como proceder neste caso desativando este header e reativando ao final da requisição.

```html
<form id="form-4" data-viacep>(...)</form>

<script>
$('#form-4').on('viacep.ajax.before', function () {
    // remover o header para esta requisicao
     delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
}).on('viacep.ajax.complete', function () {
    // readicionar o header para outras requisições internas ao projeto.
    $.ajaxSettings.headers["X-CSRF-TOKEN"] = $('meta[name="csrf-token"]').attr('content');
});
</script>
```

### Integrando com Google Analytics
Talvez seja interessante para e equibe de BI extrair algumas informações sobre essas buscas no google analytics. O exemplo abaixo ilustra como enviar um evento com o nome da cidade buscada para o GA. Você pode adpatar para sua necessidade.


```html
<form id="form-5" data-viacep>(...)</form>

<script>
$('#form-5').on( 'viacep.ajax.success', function ( e, response ) {
    ga( 'send', 'event', 'CEP', 'buscar', response.cidade );
});
</script>
```

### Integrando com Google TagManager
O exemplo abaixo ilustra a situação anterior porém enviando o evento via TagManager ao invés do GA
.

```html
<form id="form-6" data-viacep>(...)</form>

<script>
$('#form-6').on( 'viacep.ajax.success', function ( e, response ) {
    dataLayer.push({
        event: 'sendToGA',
        eventCategory: 'CEP',
        eventAction: 'buscar',
        eventLabel: response.cidade
    });
});
</script>
```

### Integrando com Select2  

Este plugin está programado para funcionar com a biblioteca `Select2` de forma nativa.

Caso você precise de algum ajuste, você pode estar utilizando a api do `select2` em conjunto com a api de eventos deste plugin, em específico o evento `viacep.ajax.success` para refazer o bind dos valores no `select2`. Veja:

```html
<form id="form-7" data-viacep>
    (...)
    <select name="estado" data-viacep-estado id="estado">
        <!-- (... options aqui) -->
    </select>  
</form>

<script>
$('#form-7').on( 'viacep.ajax.success', function ( e, response ) {
    // utilizar a api do select2
    // @see https://select2.org/programmatic-control
});
</script>
```


### Campos gia ibge unidade e complemento

Talvez em seu(s) formulário(s) você precise do(s) campo(s) `gia` e/ou `ibge` e/ou `complemento` e/ou `unidade`. Você pode estar populando estes campos de 3 formas:

1. Definindo-os nas configurações globais em `$.fn.viacep.defaults` 

```html
<form data-viacep>
    (...)
    <input name="gia" class="gia">
    <input name="unidade" class="unidade">
    <input name="ibge" class="ibge">
    <input name="complemento" class="complemento">
</form>

<script>
$.fn.viacep.defaults = {
	container : '[data-viacep]',
	field_logradouro: '[data-viacep-endereco], .viacep-endereco',
	field_bairro: '[data-viacep-bairro], .viacep-bairro',
	field_localidade: '[data-viacep-cidade], .viacep-cidade',
	field_uf: '[data-viacep-estado], .viacep-estado',
    field_cep: '[data-viacep-cep], .viacep-cep',
    
    // campos customizados
    field_gia: '.gia',
    field_ibge: '.ibge',
    field_complemento: '.complemento',
    field_unidade: '.unidade',
};

$('[data-viacep]').viacep();
</script>
```

2. Definindo os campos na instancia do plugin

```html
<form id="form-8" data-viacep>
    (...)
    <input name="gia" class="gia">
    <input name="unidade" class="unidade">
    <input name="ibge" class="ibge">
    <input name="complemento" class="complemento">
</form>

<script>
$('#form-8').viacep({
    field_gia: '.gia',
    field_ibge: '.ibge',
    field_complemento: '.complemento',
    field_unidade: '.unidade',
});
</script>
```

3. Populando os campos via evento `viacep.ajax.success` (recomendado).  
Esta opção é a recomendada pois nela você tem maior controle sobre os dados recebidos e os campos que você precisa popular. Atente-se que nem sempre o resposta da api do viaCEP retorna com estes dados populados.
```html
<form id="form-9" data-viacep>(...)</form>

<script>
$('#form-9').on('viacep.ajax.success', function (e, response) {
    // TO DO implementar validações
    $(this).find('.gia').val(response.gia);
    $(this).find('.unidade').val(response.unidade);
    $(this).find('.ibge').val(response.ibge);
    $(this).find('.complemento').val(response.complemento);

    // Ex: concatenar o complemento no campo endereço
    $(this).find('#endereco').val(response.logradouro + ' ' + response.complemento);
});
</script>
```

### Apoie
Apoie o projeto enviando **HTMLCOIN**   
Wallet: **[HqgaiK6T1o2JP4p3p34CZp2g3XnSsSdCXp](htmlcoin:HqgaiK6T1o2JP4p3p34CZp2g3XnSsSdCXp?label=Doa%C3%A7%C3%B5es%20Github)**  
  
![Doar HTMLCoin](https://www.viniciusdesouza.com.br/img/htmlcoin.png)
 
 #### Licença
 MIT
