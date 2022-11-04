fetch("assets/multi.json")
    .then((res) => res.json())
    .then((data) => (obj = data))
    .then(() => {
        document.querySelector("#minesMultiInfo").innerHTML += '<tr>'
            + '<td rowspan="2"></td>'
            + '<th colspan="5" scope="colgroup">Mines</th>'
            + '</tr>'
            + '<tr>'
            + '<th scope="col">Amount: 1&ensp;&ensp;</th>'
            + '<th scope="col">Amount: 3&ensp;&ensp;</th>'
            + '<th scope="col">Amount: 5&ensp;&ensp;</th>'
            + '<th scope="col">Amount: 10&ensp;&ensp;</th>'
            + '<th scope="col">Amount: 20&ensp;&ensp;</th>'
            + '</tr>'
            + '<tr>'
            + '<th scope="row">3x3&ensp;&ensp;&ensp;&ensp;</th>'
            + '<td>' + obj["x3"]["mine-1"] + ' x</td>'
            + '<td>' + obj["x3"]["mine-3"] + ' x</td>'
            + '<td>' + obj["x3"]["mine-5"] + ' x</td>'
            + '<td>-</td>'
            + '<td>-</td>'
            + '</tr>'
            + '<tr>'
            + '<th scope="row">4x4&ensp;&ensp;&ensp;&ensp;</th>'
            + '<td>' + obj["x4"]["mine-1"] + ' x</td>'
            + '<td>' + obj["x4"]["mine-3"] + ' x</td>'
            + '<td>' + obj["x4"]["mine-5"] + ' x</td>'
            + '<td>' + obj["x4"]["mine-10"] + ' x</td>'
            + '<td>-</td>'
            + '</tr>'
            + '<tr>'
            + '<th scope="row">5x5&ensp;&ensp;&ensp;&ensp;</th>'
            + '<td>' + obj["x5"]["mine-1"] + ' x</td>'
            + '<td>' + obj["x5"]["mine-3"] + ' x</td>'
            + '<td>' + obj["x5"]["mine-5"] + ' x</td>'
            + '<td>' + obj["x5"]["mine-10"] + ' x</td>'
            + '<td>' + obj["x5"]["mine-20"] + ' x</td>'
            + '</tr>'
            + '<tr>'
            + '<th scope="row">6x6&ensp;&ensp;&ensp;&ensp;</th>'
            + '<td>-</td>'
            + '<td>-</td>'
            + '<td>' + obj["x6"]["mine-5"] + ' x</td>'
            + '<td>' + obj["x6"]["mine-10"] + ' x</td>'
            + '<td>' + obj["x6"]["mine-20"] + ' x</td>'
            + '</tr>'
            + '<tr>'
            + '<th scope="row">8x8&ensp;&ensp;&ensp;&ensp;</th>'
            + '<td>-</td>'
            + '<td>-</td>'
            + '<td>' + obj["x8"]["mine-5"] + ' x</td>'
            + '<td>' + obj["x8"]["mine-10"] + ' x</td>'
            + '<td>' + obj["x8"]["mine-20"] + ' x</td>'
        '</tr>'
    })
