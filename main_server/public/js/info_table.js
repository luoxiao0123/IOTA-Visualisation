var items = $("#information.item");
$(function () {

    // force numbers in "information" to change randomly. This is just for current showing.
    // We will delete this later
    var dataList = [];
    $.getJSON("http://51.140.113.215:3000/infor_table_initial", function (data) {
        for (var index = 0; index < 9; index++) {
            dataList.push({'hash':data[index]['this_hash'],
                           'type':data[index]['type'],
                           'value':data[index]['value'],
                           'confirmation_time':data[index]['confirmation_time']})
        }
        updateTable(dataList)
    })
    var timer = setInterval(function () {
        resetColor(0);
        changeColor(8);
        setTimeout(myFunction = function () {
            resetColor(8);
            $.getJSON("http://51.140.113.215:3000/infor_table_update", function (data) {
                dataList.pop();
                dataList.unshift({'hash':data[0]['this_hash'],
                    'type':data[0]['type'],
                    'value':data[0]['value'],
                    'confirmation_time':data[0]['confirmation_time']})
                updateTable(dataList);
            })
            changeColor(0);

        }, 500)


    }, 2000)

});

var changeColor = function (index) {
    if (index===0)
    {
        items[index].style.color = '#66ff66';
    }
    else{
        items[index].style.color = '#ff471a';
    }

}

var resetColor = function (index) {
    items[index].style.color = '#c0c0c0';
}

var updateTable = function(lst){
    for (var index = 0; index < 9; index++) {
        items.eq(index).children().eq(0).html(lst[index]['this_hash']);
        items.eq(index).children().eq(1).html(lst[index]['type']);
        items.eq(index).children().eq(2).html(lst[index]['value']);
        items.eq(index).children().eq(3).html(lst[index]['confirmation_time']);
    }
};