$(function () {
        var eject = $.eject(["#d1", "#d3", ".cs0"]);
    eject.domEvent(["click", "contextmenu"]).closeBt(true);
    eject.iniBt({
        "按钮一": testFn,
        "按钮二": testFn,
        "按钮三": testFn
    });
    console.log("Eject object:",eject)
});
function testFn(e) {
    console.log(`来自“${$(e.target).text()}”的“${e.type}”事件。`);
    alert(`来自“${$(e.target).text()}”的“${e.type}”事件。`);
    //return false;
}