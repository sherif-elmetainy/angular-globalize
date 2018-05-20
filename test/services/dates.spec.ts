import { CurrentCultureService, GlobalizationService } from "../../src/module";
import { CldrService } from "../../src/services/cldr.service";
import "./load-globalize-data";

import { expect } from "chai";
// tslint:disable-next-line
const chai: Chai.ChaiStatic = require("chai");
// tslint:disable-next-line
chai.use(require("chai-datetime"));

describe("Globalization date formatting", () => {

    const cultureService = new CurrentCultureService(["en-GB"]);

    const service = new GlobalizationService(new CldrService(), cultureService);

    it("formats date null or undefined", () => {
        expect(service.formatDate(null)).empty;
        expect(service.formatDate(undefined)).empty;
        expect(service.formatDate(null, { date: "short" })).empty;
        expect(service.formatDate(undefined, { date: "short" })).empty;

        expect(service.formatDate(null, "de", { date: "short" })).empty;
        expect(service.formatDate(undefined, "de", { date: "short" })).empty;
    });

    it("formats date using current culture", () => {
        const date = new Date(2018, 1, 18, 19, 45, 57);

        expect(service.formatDate(date)).equal("18/02/2018");
        expect(service.formatDate(date, { date: "long" })).equal("18 February 2018");
        expect(service.formatDate(date, { datetime: "short" })).equal("18/02/2018, 19:45");
    });

    it("formats date using provided culture", () => {
        const date = new Date(2018, 1, 18, 19, 45, 57);

        expect(service.formatDate(date, "de")).equal("18.2.2018");
        expect(service.formatDate(date, "de", { date: "long" })).equal("18. Februar 2018");
        expect(service.formatDate(date, "de", { datetime: "short" })).equal("18.02.18, 19:45");
    });

    it("formats date using null culture", () => {
        const date = new Date(2018, 1, 18, 19, 45, 57);

        expect(service.formatDate(date, null)).equal("18/02/2018");
        expect(service.formatDate(date, null, { date: "long" })).equal("18 February 2018");
        expect(service.formatDate(date, null, { datetime: "short" })).equal("18/02/2018, 19:45");
    });

    it("formats date using null options", () => {
        const date = new Date(2018, 1, 18, 19, 45, 57);

        expect(service.formatDate(date, undefined, null)).equal("18/02/2018");
        expect(service.formatDate(date, "de", null)).equal("18.2.2018");
        expect(service.formatDate(date, null, null)).equal("18/02/2018");
    });

    it("parses date null or undefined", () => {
        expect(service.parseDate(null)).null;
        expect(service.parseDate(undefined)).null;
        expect(service.parseDate(null, { date: "short" })).null;
        expect(service.parseDate(undefined, { date: "short" })).null;

        expect(service.parseDate(null, "de", { date: "short" })).null;
        expect(service.parseDate(undefined, "de", { date: "short" })).null;
    });

    it("parses date using current culture", () => {
        const date = new Date(2018, 1, 18, 0, 0, 0);

        expect(service.parseDate(service.formatDate(date))).equalTime(date);
        expect(service.parseDate(service.formatDate(date, { date: "long" }), { date: "long" })).equalTime(date);
        expect(service.parseDate(service.formatDate(date, { date: "short" }), { date: "short" })).equalTime(date);
    });

    it("parses date using provided culture", () => {
        const date = new Date(2018, 1, 18, 0, 0, 0);

        expect(service.parseDate(service.formatDate(date, "de"), "de")).equalTime(date);
        expect(service.parseDate(service.formatDate(date, "de",
            { date: "long" }), "de", { date: "long" })).equalTime(date);
        expect(service.parseDate(service.formatDate(date, "de",
            { date: "short" }), "de", { date: "short" })).equalTime(date);
    });

    it("parses time only date using current culture", () => {
        const date = new Date();
        date.setMilliseconds(0);
        expect(service.parseDate(service.formatDate(date, { time: "long" }), { time: "long" })).equalTime(date);
        date.setSeconds(0);
        expect(service.parseDate(service.formatDate(date, { time: "short" }), { time: "short" })).equalTime(date);
    });
});
