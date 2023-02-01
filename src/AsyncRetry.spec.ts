import { retryOnReject } from "./AsyncRetry"
import { expect } from "./_chai.spec"

describe("AsyncRetry", () => {
  it("returns simple passing thunk", async () => {
    expect(await retryOnReject(() => "hello", 0)).to.eql("hello")
  })
  it("rejects fail/pass thunk", async () => {
    const results = [new Error("boom"), 123]
    return expect(
      retryOnReject(() => {
        const r = results.shift()
        if (r != null && r instanceof Error) throw r
        else return r
      }, 0)
    ).to.be.rejectedWith(/boom/)
  })
  it("accepts fail/pass thunk if retries > 0", async () => {
    const results = [new Error("boom"), 123]
    return expect(
      retryOnReject(() => {
        const r = results.shift()
        if (r != null && r instanceof Error) throw r
        else return r
      }, 1)
    ).to.eventually.eql(123)
  })
})
