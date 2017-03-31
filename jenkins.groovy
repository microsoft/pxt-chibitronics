import jobs.generation.Utilities;
import jobs.generation.InternalUtilities;

def project = GithubProject
def projectName = "pxt-chibitronics"

[true, false].each { isPR ->
    def newJobName = Utilities.getFullJobName(projectName, isPR)

    def newJob = job(newJobName) {
        steps {
            shell("chmod +x ./jenkins.sh")
            shell("./jenkins.sh ${isPR}")
        }

        if (!isPR) {
            wrappers {
                credentialsBinding {
                    string("PXT_ACCESS_TOKEN", "pxt_access_token")
                    string("PXT_RELEASE_REPO", "pxt_release_repo_chibitronics")
                }
            }
        }
    }

    Utilities.setMachineAffinity(newJob, "Ubuntu", "20161020")
    InternalUtilities.standardJobSetup(newJob, project, isPR, "*/*")

    if (isPR) {
        Utilities.addGithubPRTrigger(newJob, "Default Testing")
    } else {
        Utilities.addGithubPushTrigger(newJob)
    }
}
