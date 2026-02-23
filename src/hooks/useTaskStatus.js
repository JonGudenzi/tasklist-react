export default function getNextStatus(status) {
    let nextSatus;

    if (status === "open") {
        nextSatus = "done";
    } else if (status === "done") {
        nextSatus = "archived";
    } else {
        nextSatus = "open";
    }
    return nextSatus;
}