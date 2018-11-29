$(document).ready(function () {
    obtenerPost();
});

function meGusta(id) {
    var token = localStorage.getItem("token");

    var data = $('#star-' + id).data();
    $("#star-" + id).removeClass(data.like ? 'fas' : 'far');
    $("#star-" + id).addClass(data.like ? 'far' : 'fas');

    fetch(`http://68.183.27.173:8080/post/${id}/like`, {
        method: data.like ? 'DELETE' : 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        data.like = data.like ? false : true;
    });
}

function obtenerPost() {
    var lista = $("#listadoPost");

    var plantilla = `
        <div class="card-body">
            <h5 class="card-title"> <i id='star-{id}' class="{star} fa-star" data-like="{liked}" onclick="meGusta({id})"></i>{titulo}</h5>
            <p class="card-text">{cuerpo}</p>
            <p>{email}</p>
            <p>{likes}</p>
            </div>
        </div>
        `
    var token = localStorage.getItem("token");
    console.log(token);

    fetch("http://68.183.27.173:8080/post", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.json())
        .then(response => {

            console.log(response);

            for (var post of response) {
                var item = plantilla
                    .replace('{star}', (post.liked ? 'fas' : 'far'))
                    .replace(new RegExp('{id}', 'g'), post.id)
                    .replace(new RegExp('{liked}', 'g'), post.liked)
                    .replace('{liked}', post.liked)
                    .replace('{titulo}', post.title)
                    .replace('{cuerpo}', post.body)
                    .replace('{email}', post.userEmail)
                    .replace('{likes}',post.likes);

                lista.append(`${item}`);
            }

        })
        .catch(error => console.error('Error:', error));



}