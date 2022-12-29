$(function(){

    $('#search_input').keyup(function(){
        var k = $(this).val();
        $(".post_list > tr").hide();
        var name = $(".post_list > tr > td:contains('" + k + "')");
        var age = $(".post_list > tr > td:contains('" + k + "')");
        var sex = $(".post_list > tr > td:contains('" + k + "')");
        var contact = $(".post_list > tr > td:contains('" + k + "')");
        $(name).show();
        $(age).show();
        $(sex).show();
        $(contact).show();
    })  
});


