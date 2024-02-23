describe('question 1', () => {
    it('Assignment', async () => {
        // Login method is using login with email option
        //variables
        const token = '' //go to settings > intergrations > click Developer tab > Copy API token and paste here
        const email = ''
        const password = ''
        //Part 1
        const { TodoistApi }  = require('@doist/todoist-api-typescript')
        const api = new TodoistApi(token)
        const projectId = null
        api.addProject({ name: "Test Project" })
            .then((project) => {
                console.log(project)
                projectId = project.id
            })
            .catch((error) => {
                console.log(error)
            })

        //Part 2
        const contWithEmail = await $('id=com.todoist:id/btn_email')
        await contWithEmail.click();
        const loginWithEmail = await $('id=com.todoist:id/email_login')
        await expect(loginWithEmail).toBeExisting()
        await loginWithEmail.click();
        const loginTitle = await $('//android.widget.TextView[@text="Login"]')
        await expect(loginTitle).toBeExisting()
        const emailInput = await $('//android.widget.EditText[@resource-id="email"]')
        await emailInput.addValue(email)
        const passwordInput = await $('//android.widget.EditText[@resource-id="password"]')
        await passwordInput.addValue(password)
        const loginBtn = await $('//android.view.View[@resource-id="auth_button_tag"]/android.widget.Button')
        await loginBtn.click();
        const todayLbl = await $('(//android.widget.TextView[@text="Today"])[1]')
        await expect(todayLbl).toBeExisting()
        const browseBtn = await $('//androidx.compose.ui.platform.ComposeView[@resource-id="com.todoist:id/compose_navigation_holder"]/android.view.View/android.view.View/android.view.View/android.view.View[4]/android.view.View[2]')
        await browseBtn.click();
        const myProjectLbl = await $('//android.widget.TextView[@text="My Projects"]')
        await expect(myProjectLbl).toBeExisting()
        const testProjectLbl = await $('//android.widget.TextView[@text="Test Project"]')
        await expect(testProjectLbl).toBeExisting()
        await expect(testProjectLbl).toHaveText('Test Project')

        //Part 3
        await testProjectLbl.click()
        const addBtn = await $('~Quick add')
        await addBtn.click()
        const taskTitleInput = await $('id=android:id/message')
        await taskTitleInput.addValue('Test Task')
        const createBtn = await $('~Add')
        await createBtn.click()
        const taskTitle = await $('id=com.todoist:id/text')
        await expect(taskTitle).toHaveText('Test Task')

        try {
            const tasks = await api.getTasks();
            
            if (tasks && tasks.length > 0) {
                console.log('All tasks:', tasks);
        
                const filteredTasks = tasks.filter((task) => task.content === "Test Task");
        
                if (filteredTasks.length > 0) {
                    console.log('Task is created');
                } else {
                    console.log('Task not found');
                }
            } else {
                console.log('No tasks found');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    })
})