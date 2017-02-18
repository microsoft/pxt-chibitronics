pxsim.noRefCounting();


var __main__1 = entryPoint = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) { 
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.lastBrkId = 1;
    r0 = new pxsim.Sprite();
    s.tmp_0 = r0;
    r0 = globals.s___21;
    r0 = s.tmp_0;
    globals.s___21 = (r0);
    s.lastBrkId = 2;
    r0 = globals.s___21;
    s.tmp_0 = r0;
    (function(cb) { s.tmp_0.forwardAsync(10).done(cb) })(buildResume(s, 2));
    checkResumeConsumed();
    return;
  case 2:
    r0 = s.retval;
    s.tmp_1 = r0;
    r0 = s.tmp_0;
    r0 = s.tmp_1;
    s.lastBrkId = 3;
    r0 = globals.s___21;
    r0 = r0.x;
    globals.y___22 = (r0);
  case 1:
    return leave(s, r0)
  default: oops()
} } }
__main__1.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"pxt-core.d.ts","functionName":"<main>"}
__main__1.continuations = [ 2 ]

var C18_VT = {
  name: "Sprite",
  refmask: [false,false],
  methods: [
  ],
  iface: [
  ],
};

setupDebugger(4)

pxsim.setupStringLiterals({})
