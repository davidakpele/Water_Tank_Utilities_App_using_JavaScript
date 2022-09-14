"use strict";

class Tank {

    constructor() {
        this.levelOfLiquidInTank = 5;

        this.maximumLevelOfLiquid = 10;
        this.minimumLevelOfLiquid = 0;

        this.setPoint = 5;

        this.alarmForHighLevel = 8;
        this.alarmForLowLevel = 2;
    }

    addLevelOfLiquid(){
        this.levelOfLiquidInTank++;

        // Reverse the situation in case of that level of
        // liquid is more to maximum level
        if (this.levelOfLiquidInTank > this.maximumLevelOfLiquid){
            this.levelOfLiquidInTank--;
        }

        this.updatedLabelLevelTank();
    }

    subLevelOfLiquid(){
        this.levelOfLiquidInTank--;

        // Reverse the situation in case of that level of
        // liquid is more to maximum level
        if (this.levelOfLiquidInTank < this.minimumLevelOfLiquid){
            this.levelOfLiquidInTank++;
        }

        this.updatedLabelLevelTank();
    }

    drainLevelOfTank(){
        let clock = setInterval(() => {
            this.levelOfLiquidInTank--;
            updateAllLabels();
            if (this.levelOfLiquidInTank === this.minimumLevelOfLiquid){
                clearInterval(clock);
            }
        }, 500);
    }

    setSetPointOfTank(_setPoint){
        this.setPoint = _setPoint;

        if (this.setPoint > this.levelOfLiquidInTank){
            let clock = setInterval(() => {
                this.levelOfLiquidInTank++;
                updateAllLabels();
                if (this.levelOfLiquidInTank === this.setPoint){
                    clearInterval(clock);
                }
            }, 500);
        }
        else if (this.setPoint < this.levelOfLiquidInTank){
            let clock = setInterval(() => {
                this.levelOfLiquidInTank--;
                updateAllLabels();
                if (this.levelOfLiquidInTank === this.setPoint){
                    clearInterval(clock);
                }
            }, 500);
        }
    }

    setMaximumLevelOfLiquid(_level){
        this.maximumLevelOfLiquid = _level;
    }

    setMinimumLevelOfLiquid(_level){
        this.minimumLevelOfLiquid = _level;
    }

    setHighLevelAlarm(_level){
        this.alarmForHighLevel = _level;
    }

    setLowLevelAlarm(_level){
        this.alarmForLowLevel = _level;
    }

    updatedLabelLevelTank(){
        let label = document.getElementById("label-level-tank");

        // Update the label of level of liquid in tank.
        label.innerText = this.levelOfLiquidInTank;
    }

    updateLabelForSetPoint(){
        let inputSetPoint = document.getElementById("input-set-point");
        inputSetPoint.setAttribute("max", this.maximumLevelOfLiquid);
        inputSetPoint.value = this.setPoint;
    }

    updateLabelCapacity(){
        let inputMax = document.getElementById("input-max-level");
        inputMax.value = this.maximumLevelOfLiquid;

        let inputMin = document.getElementById("input-min-level");
        inputMin.value = this.minimumLevelOfLiquid;
    }

    updateLabelAlarm(){
        let inputHighAlarm = document.getElementById("input-high-level-alarm");
        inputHighAlarm.setAttribute("max", this.maximumLevelOfLiquid);
        inputHighAlarm.setAttribute("min", this.minimumLevelOfLiquid);
        inputHighAlarm.value = this.alarmForHighLevel;

        let inputLowAlarm = document.getElementById("input-low-level-alarm");
        inputLowAlarm.setAttribute("max", this.maximumLevelOfLiquid);
        inputLowAlarm.setAttribute("min", this.minimumLevelOfLiquid);
        inputLowAlarm.value = this.alarmForLowLevel;
    }

    updateImageLevelOfTank(){
        let image = document.getElementById("img-level-tank");

        if (this.levelOfLiquidInTank >= this.alarmForHighLevel) {
            image.setAttribute("src", "../Water Tank Utilities App using JavaScript/img/WaterTankRed.png");
        }
        else if(this.levelOfLiquidInTank <= this.alarmForLowLevel){
            image.setAttribute("src", "../Water Tank Utilities App using JavaScript/img/WaterTankYellow.png");
        }
        else if (this.levelOfLiquidInTank === 0){
            image.setAttribute("src", "../Water Tank Utilities App using JavaScript/img/WaterTankEmpty.png");
        }
        else {
            image.setAttribute("src", "../Water Tank Utilities App using JavaScript/img/WaterTank.png");
        }
    }

    updateProgressBarLevelOfTank(){
        let progressBar = document.getElementById("progress-level-tank");

        let levelOfLiquid = this.levelOfLiquidInTank / this.maximumLevelOfLiquid * 100;

        progressBar.value = levelOfLiquid;
        progressBar.setAttribute("aria-valuenow", levelOfLiquid.toString());
    }
}

// Only instance of tank
var tank = new Tank();

function updateAllLabels() {
    tank.updatedLabelLevelTank();
    tank.updateLabelForSetPoint();
    tank.updateLabelCapacity();
    tank.updateLabelAlarm();
    tank.updateImageLevelOfTank();
    tank.updateProgressBarLevelOfTank();
}

function addLevelOfLiquidInTank() {
    tank.addLevelOfLiquid();
    updateAllLabels();
}

function subLevelOfLiquidInTank() {
    tank.subLevelOfLiquid();
    updateAllLabels();
}

function setPointOfTank() {
    let valueOfSetPoint = document.getElementById("input-set-point").value;

    tank.setSetPointOfTank(parseInt(valueOfSetPoint));
    updateAllLabels();
}

function confirmChangeInCapacityAndAlarm(){
    // Init with capacity
    let maxCapacity = document.getElementById("input-max-level").value;
    let minCapacity = document.getElementById("input-min-level").value;

    tank.setMaximumLevelOfLiquid(parseInt(maxCapacity));
    tank.setMinimumLevelOfLiquid(parseInt(minCapacity));

    // Init with alarm
    let highAlarm = document.getElementById("input-high-level-alarm").value;
    let lowAlarm = document.getElementById("input-low-level-alarm").value;

    tank.setHighLevelAlarm(parseInt(highAlarm));
    tank.setLowLevelAlarm(parseInt(lowAlarm));

    // Update All Labels
    updateAllLabels();
    // Disabled all labels.
    switchEnableDisableInput();
}

function cancelChangesInCapacityAndAlarm(){

    // Only choice a element for verify if all elements are disabled.
    if (! document.getElementById("input-max-level").disabled){
        switchEnableDisableInput();
    }

    updateAllLabels();
}

function switchEnableDisableInput(){
    let maxCapacity = document.getElementById("input-max-level");
    let minCapacity = document.getElementById("input-min-level");

    let highAlarm = document.getElementById("input-high-level-alarm");
    let lowAlarm = document.getElementById("input-low-level-alarm");

    // Check only an element, if a element
    // is disabled, all element too are disabled.
    if (maxCapacity.disabled) {
        maxCapacity.disabled = false;
        minCapacity.disabled = false;

        highAlarm.disabled = false;
        lowAlarm.disabled = false;

        // Enable the button for save the changes.
        document.getElementById("button-confirm").disabled = false;
        // Enable the button for cancel the changes.
        document.getElementById("button-cancel").disabled = false;
        // Disable the button of edit
        document.getElementById("button-edit").disabled = true;

        // Validation H, Point 3
        document.getElementById("button-add-level").disabled = true;
        document.getElementById("button-sub-level").disabled = true;
        document.getElementById("input-set-point").disabled = true;
        document.getElementById("button-set-point").disabled = true;
    }
    else {
        maxCapacity.disabled = true;
        minCapacity.disabled = true;

        highAlarm.disabled = true;
        lowAlarm.disabled = true;

        // Disabled the button for avoid accidental changes.
        document.getElementById("button-confirm").disabled = true;
        // Disabled the button of cancel, no is necessary in this part of execution.
        document.getElementById("button-cancel").disabled = true;
        // Enable the button of edit
        document.getElementById("button-edit").disabled = false;

        // Validation H, Point 3
        document.getElementById("button-add-level").disabled = false;
        document.getElementById("button-sub-level").disabled = false;
        document.getElementById("input-set-point").disabled = false;
        document.getElementById("button-set-point").disabled = false;
    }
}

function drainTank(){
    if (confirm("Do you want to drain the Tank?")){
        tank.drainLevelOfTank();
        updateAllLabels();
    }
}

// When load the page, call the
// function for update all labels.
window.onload = function () {
    updateAllLabels();
};