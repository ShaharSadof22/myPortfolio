'use strict';

console.log('Starting up');



function init() {
  initService();
  renderProjGrid();
  renderProjModel();


}

function renderProjGrid() {

  var strHtmls = gProjs.map(proj =>
    `<div class="col-md-4 col-sm-6 portfolio-item">
  <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${proj.id}">
    <div class="portfolio-hover">
      <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
      </div>
    </div>
    <img class="img-fluid" src=${proj.url} alt="">
  </a>
  <div class="portfolio-caption">
    <h4>${proj.name}</h4>
  </div>
</div>`
  );

  document.querySelector('.main-portfolio-grid').innerHTML = strHtmls.join('');
}

function renderProjModel() {

  var strHtmls = gProjs.map(proj =>
    `<div class="portfolio-modal modal fade" id="portfolioModal${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                 <h2>${proj.name}</h2> 
        
                <img class="img-fluid d-block mx-auto" src=${proj.url} alt="Image">

                <p>${proj.desc}</p>
                <a target="_blank" href="projects/${proj.name}/index.html"><button class="btn btn-info">Check it Out!</button></a>
                
                <ul class="list-inline">
                  <li>Date: ${proj.publishedAt}</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
  );

  document.querySelector('.main-portfolio-model').innerHTML = strHtmls.join('');
}

function contactHandler() {
  var emailVal = document.querySelector('.form-control-email').value;
  var subjectVal = document.querySelector('.form-control-subject').value;
  var textareaVal = document.querySelector('.form-control-textarea').value;

  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=shaharsadof22@gmail.com&su=${subjectVal}&body=${`email:`, emailVal,`body:`, textareaVal}`);

}