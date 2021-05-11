$(function (palavraChave) {
    var $produtosContainer = $('#produtos');

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/produtos/',
        data: { 
            busca : palavraChave
        },
        success: function(produtos){
            $.each(produtos, function(i,item){
                $produtosContainer.append('<li>' + item.NOME + '</li>')
            });
        }
    });
});