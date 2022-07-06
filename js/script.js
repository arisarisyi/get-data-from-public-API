function searchMovies() {
  $("#movie-list").html("")

  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "af4a85dd",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search
        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `<div class="col-md-4">
                <div class="card mb-4">
                    <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">` +
              data.Title +
              `</h5>
                    </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Year ` +
              data.Year +
              `</li>
                        <li class="list-group-item">IMDB ID ` +
              data.imdbID +
              `</li>
                        <li class="list-group-item">Type ` +
              data.Type +
              `</li>
              <li class="list-group-item"><a href="#" class="card-link see-detail"  data-bs-toggle="modal"
      data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">
              See details</a></li>
                      </ul>
                </div>
            </div>`
          )
        })
        $("#search-input").val("")
      } else {
        $("#movie-list").html(
          `
        <div class="row">
        <h1 class="text-center">` +
            result.Error +
            `</h1>
        </div>`
        )
      }
    },
  })
}

$("#search-button").on("click", function () {
  searchMovies()
})

$("#search-input").on("keyup", function (event) {
  if (event.keyCode === 13) {
    searchMovies()
  }
})

// jquery carikan element movie list ketika saya click kelas see-detail di dalemnya jalankan function ini namanya event delegation
$("#movie-list").on("click", ".see-detail", function () {
  $.ajax({
    url: "http://www.omdbapi.com/",
    dataType: "json",
    type: "get",
    data: {
      apikey: "af4a85dd",
      i: $(this).data("id"),
    },
    success: function (result) {
      if (result.Response === "True") {
        $(".modal-body").html(
          `
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="` +
            result.Poster +
            `" alt="..." class="img-fluid"/>
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h4>` +
            result.Title +
            `</h4></li>
                  <li class="list-group-item">Released ` +
            result.Released +
            `</li>
                  <li class="list-group-item">Genre ` +
            result.Genre +
            `</li>
                  <li class="list-group-item">Actors ` +
            result.Actors +
            `</li>
                  <li class="list-group-item">Plot ` +
            result.Plot +
            `</li>
                </ul>
              </div>
            </div>
          </div>
        `
        )
      }
    },
  })
})
