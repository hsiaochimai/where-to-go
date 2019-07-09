import ds from './STORE/dataService'
export async function checkLoginAndRedirect(history) {
    let user = await ds.getLoggedInUser()
    if (!user) {
        history.push("/login");
        return false
    }
    return true
}
