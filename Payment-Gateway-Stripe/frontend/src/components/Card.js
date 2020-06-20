import React from "react";

export default function Card() {
  return (
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">This is the Title of this Card</span>
            <p>
              Write your Own Description.
            </p>
          </div>
          <div class="card-action">
            <a href="#">Setup your Links</a>
          </div>
        </div>
      </div>
    </div>
  );
}
