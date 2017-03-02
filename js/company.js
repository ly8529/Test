$(document).ready(function(){
     //小字号
    $('#btn_small').on('click',function(){
        $('#content').css({'font-size':'12px'})
    })
    //大字号
    $('#btn_large').on('click',function(){
        $('#content').css({'font-size':'16px'})
    })
    //雅黑
    $('#btn_ya').on('click',function(){
        $('#content').css({'font-family':'open_sansregular, "Microsoft YaHei"'});
    })
    //宋体
    $('#btn_song').on('click',function(){
        $('#content').css({'font-family':'open_sansregular, SimSun'});
    })
})
   
