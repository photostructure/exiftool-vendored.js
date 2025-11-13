import { Settings } from "./Settings";
import { expect } from "./_chai.spec";

describe("Settings", () => {
  afterEach(() => {
    // Always reset to defaults after each test to avoid test pollution
    Settings.reset();
  });

  describe("allowArchaicTimezoneOffsets", () => {
    it("defaults to false", () => {
      expect(Settings.allowArchaicTimezoneOffsets.value).to.eql(false);
    });

    it("can be set to true", () => {
      Settings.allowArchaicTimezoneOffsets.value = true;
      expect(Settings.allowArchaicTimezoneOffsets.value).to.eql(true);
    });

    it("can be set to false after being true", () => {
      Settings.allowArchaicTimezoneOffsets.value = true;
      Settings.allowArchaicTimezoneOffsets.value = false;
      expect(Settings.allowArchaicTimezoneOffsets.value).to.eql(false);
    });
  });

  describe("resetToDefaults()", () => {
    it("resets allowArchaicTimezoneOffsets to false", () => {
      Settings.allowArchaicTimezoneOffsets.value = true;
      Settings.reset();
      expect(Settings.allowArchaicTimezoneOffsets.value).to.eql(false);
    });

    it("can be called multiple times", () => {
      Settings.reset();
      Settings.reset();
      expect(Settings.allowArchaicTimezoneOffsets.value).to.eql(false);
    });

    it("works when settings are already at defaults", () => {
      Settings.reset();
      expect(Settings.allowArchaicTimezoneOffsets.value).to.eql(false);
    });
  });

  describe("Setting.onChange()", () => {
    it("notifies listeners when a setting changes", () => {
      let called = false;
      let receivedOld: unknown;
      let receivedNew: unknown;

      const unsubscribe = Settings.allowArchaicTimezoneOffsets.onChange(
        (oldValue, newValue) => {
          called = true;
          receivedOld = oldValue;
          receivedNew = newValue;
        },
      );

      Settings.allowArchaicTimezoneOffsets.value = true;

      expect(called).to.eql(true);
      expect(receivedOld).to.eql(false);
      expect(receivedNew).to.eql(true);

      unsubscribe();
    });

    it("does not notify when setting the same value", () => {
      let callCount = 0;

      const unsubscribe = Settings.allowArchaicTimezoneOffsets.onChange(() => {
        callCount++;
      });

      Settings.allowArchaicTimezoneOffsets.value = false; // Already false
      expect(callCount).to.eql(0);

      Settings.allowArchaicTimezoneOffsets.value = true;
      expect(callCount).to.eql(1);

      Settings.allowArchaicTimezoneOffsets.value = true; // Already true
      expect(callCount).to.eql(1);

      unsubscribe();
    });

    it("allows unsubscribing from changes", () => {
      let callCount = 0;

      const unsubscribe = Settings.allowArchaicTimezoneOffsets.onChange(() => {
        callCount++;
      });

      Settings.allowArchaicTimezoneOffsets.value = true;
      expect(callCount).to.eql(1);

      unsubscribe();

      Settings.allowArchaicTimezoneOffsets.value = false;
      expect(callCount).to.eql(1); // Should not increment
    });

    it("supports multiple listeners for the same setting", () => {
      let call1 = false;
      let call2 = false;

      const unsubscribe1 = Settings.allowArchaicTimezoneOffsets.onChange(() => {
        call1 = true;
      });

      const unsubscribe2 = Settings.allowArchaicTimezoneOffsets.onChange(() => {
        call2 = true;
      });

      Settings.allowArchaicTimezoneOffsets.value = true;

      expect(call1).to.eql(true);
      expect(call2).to.eql(true);

      unsubscribe1();
      unsubscribe2();
    });

    it("only notifies listeners for the specific setting that changed", () => {
      let archaicCalled = false;
      let bakerCalled = false;

      const unsubscribe1 = Settings.allowArchaicTimezoneOffsets.onChange(() => {
        archaicCalled = true;
      });

      const unsubscribe2 = Settings.allowBakerIslandTime.onChange(() => {
        bakerCalled = true;
      });

      Settings.allowArchaicTimezoneOffsets.value = true;

      expect(archaicCalled).to.eql(true);
      expect(bakerCalled).to.eql(false);

      unsubscribe1();
      unsubscribe2();
    });
  });
});
