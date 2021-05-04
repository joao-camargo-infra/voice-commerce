$(function buscarProdutos(palavraChave) {
    var $produtosContainer = $('#produtos');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/produtos',
        success: function(produtos){
            $.each(produtos, function(i,item){
                $produtosContainer.append('<li>' + item.NOME + '</li>')
            });
        }
    });
});