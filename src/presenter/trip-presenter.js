import { render, RenderPosition } from '../render.js';

import TripListView from '../view/trip-list-view.js';
import SortView from '../view/list-sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/trip-point-view.js';
import ListFilterView from '../view/list-filter-view.js';
import NewPointView from '../view/new-point-view.js';

export default class TripPresenter {
  tripListComponent = new TripListView();
  constructor({ boardContainer, filterContainer, pointsModel }) {
    this.boardContainer = boardContainer;
    this.filterContainer = filterContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.getPoints()];
    render(new ListFilterView(), this.filterContainer);
    render(new SortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);
    render(
      new NewPointView(),
      this.tripListComponent.getElement(),
      RenderPosition.AFTERBEGIN
    );
    for (let i = 0; i < this.listPoints.length; i++) {
      render(
        new PointView({ point: this.listPoints[i] }),
        this.tripListComponent.getElement()
      );
    }
    render(
      new EditPointView(this.listPoints[0]),
      this.tripListComponent.getElement(),
      RenderPosition.AFTERBEGIN
    );
  }
}
