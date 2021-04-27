$(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3306',
        success: function(data){
            console.log('success',data);
            //$.each(orders,function(i,order){});
        }
    });
});