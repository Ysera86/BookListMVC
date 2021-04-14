var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/books/getall",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/Books/Upsert?id=${data}" class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
                            Edit
                        </a>
                        &nbsp;
                        <a class='btn btn-danger text-white' style='cursor:pointer; width:70px;' onclick=Delete('/Books/Delete?id='+${data})>
                            Delete
                        </a>
                    </div>`;
                }, "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });
    // bu .DataTable cdn.dataTables .. jquery.dataTables.min.js ile eklediğimiz js sayesinde var, DT_load dt sini populate edecek
}



//create ve edit çok benzer oldukları için Upsert ekledik. 
//    Yukarda edit butonunu da Upserte yönlendirdik
// < a href = "/BookList/Edit?id=${data}" class='btn btn-success text-white' style = 'cursor:pointer; width:70px;' >
//    Edit</a >
//Sonra da index.cshtml içindeki Create new book ahrefinin asp-page="Create" kısmını Upsert için değiştirdik


// todo : functionı ekleyince alttaki json ile dolması gereken datatable dolmuyor. kapatınca doluyor. Sorunu bulamadım ??
//function Delete(url) {
//    swal({
//        title: "Are you sure?",
//        text: "Once deleted, you will not be able to recover",
//        icon: "warning",
//        buttons: true,
//        dangerMode=true
//    }).then((willDelete) => {
//        if (willDelete) {
//            $.ajax({
//                type: "DELETE",
//                url: url,
//                success: function (data) {
//                    if (data.success) {
//                        toastr.success(message);
//                        dataTable.ajax.reload();
//                    }
//                    else {
//                        toastr.error(message);
//                    }
//                }
//            });
//        }
//    });
//}