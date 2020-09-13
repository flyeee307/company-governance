var directorsHtml = ['ir_management-team.html', 'ir_directors-biographies.html', 'ir_diversity-of-directors-members.html', 'ir_staff-training-courses.html'];
$(function () {
    initHeadFoot();
    $(".management_tap_m").change(function () {
        var num = $('.management_tap_m').val();
        window.open(directorsHtml[num] ,'_self');
    });
});