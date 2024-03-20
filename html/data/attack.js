// Création de la class Attack
class Attack {
    constructor(type, name, duration, energy_delta, power, stamina_loss_scaler, critical_chance, fast) {
        this.type = type;
        this.name = name;
        this.duration = duration;
        this.energy_delta = energy_delta;
        this.power = power;
        this.stamina_loss_scaler = stamina_loss_scaler;
        this.critical_chance = critical_chance;
        this.fast = fast;
    }

    get getType() {
        return this.type;
    }

    set setType(newType) {
        this.type = newType;
    }

    get getName() {
        return this.name;
    }

    set setName(newName) {
        this.name = newName;
    }

    get getDuration() {
        return this.duration;
    }

    set setDuration(newDuration) {
        this.duration = newDuration;
    }

    get getEnergy_delta() {
        return this.energy_delta;
    }

    set setEnergy_delta(newEnergyDelta) {
        this.energy_delta = newEnergyDelta;
    }

    get getPower() {
        return this.power;
    }

    set setPower(newPower) {
        this.power = newPower;
    }

    get getStamina_loss_scaler() {
        return this.stamina_loss_scaler;
    }

    set setStamina_loss_scaler(newStaminaLossScaler) {
        this.stamina_loss_scaler = newStaminaLossScaler;
    }

    get getCritical_chance() {
        return this.critical_chance;
    }

    set setCritical_chance(newCriticalChance) {
        this.critical_chance = newCriticalChance;
    }

    get getFast() {
        return this.fast;
    }

    set setFast(newFast) {
        this.fast = newFast;
    }

    toString() {
        return "Type : " + this.type +
            "\nNom : " + this.name +
            "\nDurée : " + this.duration +
            "\nÉnergie delta : " + this.energy_delta +
            "\nPuissance : " + this.power +
            "\nÉchelle de perte d'endurance : " + this.stamina_loss_scaler +
            "\nChance critique : " + this.critical_chance +
            "\nRapide : " + this.fast;
    }
}