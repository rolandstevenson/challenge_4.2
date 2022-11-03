class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.passengerCapacity = document.getElementById("passengerCapacity");
    this.availableAtDate = document.getElementById("inputDate");
    this.availableAtTime = document.getElementById("inputTime");
  }

  async init() {
    await this.load();
    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = async () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async loadFilter(passengerCapacity) {
    console.log("passengerCapacity :", passengerCapacity);

    const tanggal = this.availableAtDate.value;
    console.log("tanggal :", tanggal);

    const jam = this.availableAtTime.value;
    console.log("jam :", jam);

    const tanggalJam = new Date(`${tanggal} ${jam}`);
    console.log("tanggalJam :", tanggalJam);

    const epochTime = tanggalJam.getTime();
    console.log("epochTime :", epochTime);

    const cars = await Binar.listCars((item) => {
      const capacityFilter = item.capacity >= Number(passengerCapacity);
      const carsAvailableAt = new Date(item.availableAt);
      const dateFilter = carsAvailableAt < epochTime;
      const availableFilter = item.available === true;
      return capacityFilter && dateFilter && availableFilter;
    });
    Car.init(cars);
  }

  /* async load() {
    const cars = await Binar.listCars((item) => {
     return item.available === true;
    });
    Car.init(cars);
  }  */

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
