const URL_ENDPOINT = "http://localhost:3000/website"

function render(website) {
    $("tbody").append(
        $(`
        <tr>
            <td>${website.id}</td>
            <td>${website.websiteName}</td>
            <td>${website.type}</td>
            <td>${website.userName}</td>
            <td>${website.password}</td>
            <td>${website.dateCreated}</td>
            <td>
                <button class="btn btn-outline-danger" onclick="deleteWebsite(${website.id})">🗑 Delete</button>
            </td>
        </tr>`)
    )
}

$.get(URL_ENDPOINT).then(data => {
    data.map(website => { render(website)})
})

$("#submitButton").on("click", function () {
    $.post(URL_ENDPOINT, {
        websiteName: $("#websiteName").val(),
        type: $("#typeOfWebsite").val(),
        userName: $("#userName").val(),
        password: $("#password").val(),
        dateCreated: $("#dateCreated").val(),
    })
})

function deleteWebsite(id) {
    $.ajax(`${URL_ENDPOINT}/${id}`, {
        type: "DELETE"
    })
    .then(() => {
        $("tbody").empty();
        $.get(URL_ENDPOINT).then(data => {
            data.map(website => render(website))
        })
    })
}

//function updatePassword() {
//    let updateId = $("#updateWebsite").val()
//    //let updatePassword = $("#updatePassword").val()
//   $.get(`${URL_ENDPOINT}/${updateId}`)
//        .then(data => {
//            console.log(data)
//        })
//}
//
//$("#updateButton").on("click", updatePassword())


