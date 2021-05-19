# %%
def main():
    pages_searched = 0
    
    search_query, location, job_type_query, pages_to_search = userinput.search_query()
    url = userinput.create_url(job_type_query, location, search_query, pages_searched)

    # get Chrome ready and navigate to the first page to search
    driver = webdriver.Chrome()
    driver.get(url)

    # get the DataFrame ready to capture results from the job search
    df = search_page.get_dataframe_ready()

    while pages_searched < pages_to_search:
        
        # checks to see if web page has loaded the right page; if it hasn't, then it's likely a CAPTCHA; it will prompt you to continue
        try: 
            job_listing = driver.find_elements_by_class_name('title')
        except Exception:
            should_continue = input('Should I continue? Y/N')
            search_page.continue_searching(should_continue, driver, df)

        # check for email form on page; if present, then it closes the form (only checks after page 1)
        try:
            search_page.check_for_email_popup(driver)
        
        # if it's unable to find the form, then it will ask you if you want to continue
        except TimeoutException:
            pass
        
        # prints starting page
        search_page.starting_page(pages_searched + 1)
        print('checkpoint 1')
        # set job selection on page to 0 for each web page
        current_listing = 0

        for i in job_listing:
            print('Checkpoint 3')
            print(i)
            # job_title, company, job_location, job_type, URL, salary, description, date_posted = search_page.get_job_info(driver, current_listing, df)

            # find first listing
            try:
                driver.find_elements_by_class_name('title')[current_listing].click()
                print('checkpoint 2')
            except Exception:
                should_continue = input('Should I continue? Y/N')
                search_page.continue_searching(should_continue, driver, df)
                
            # wait for iframe to load (this contains the job details)
            search_page.wait_to_load(driver, 'vjs-container')

            # Get URL for the job posting from iframe
            URL = driver.find_element_by_xpath('//*[@id="vjs-container-iframe"]').get_attribute('src')

            # get locations
            job_location = driver.find_elements_by_class_name('location')[current_listing].text

            # switch to the iframe
            iframe = driver.find_elements_by_id('vjs-container-iframe')
            driver.switch_to.frame(iframe[0])

            # Get Company name
            try:
                company = driver.find_element_by_xpath('//*[starts-with(@class, "jobsearch-InlineCompanyRating")]').text.splitlines()[0]
            except IndexError:
                company = 'not listed'

            # get job title
            try:
                job_title = driver.find_element_by_class_name('jobsearch-JobInfoHeader-title-container').text.splitlines()[0]
            except IndexError:
                job_title = "not listed"

            # get the rest of job details
            job_details = []
            for jobs in driver.find_elements_by_xpath('//*[starts-with(@id,"jobDetailsSection")]'):
                job_details.append(jobs.text)
            try:
                job_details = job_details[0].splitlines()
            except IndexError:
                pass

            # get salary
            try:
                salary_number = job_details.index('Salary')
                salary = job_details[salary_number + 1]
            except ValueError:
                salary = 'no info'

            # get job type
            try:
                job_type_num = job_details.index('Job Type')
                job_type = ''.join(job_details[job_type_num + 1:])
            except ValueError:
                job_type = 'not included'

            # get job description
            description = driver.find_element_by_class_name('jobsearch-jobDescriptionText').text

            # Date Posted
            d_posted_days = re.findall('[0-9]+', driver.find_element_by_class_name('jobsearch-JobMetadataFooter').text)
            date_posted = (datetime.today() - timedelta(days=int(''.join(d_posted_days)))).strftime('%d-%m-%Y')

            # switch the browser to get ready for the next listing
            driver.switch_to.default_content()

            # move job details to DataFrame
            df.loc[len(df.index)] = [job_title, company, job_location, job_type, URL, salary, description,
                                        date_posted, search_query, location, job_type_query, datetime.today().strftime('%d %m %Y')]
            
            current_listing += 1
        pages_searched = pages_searched + 1
        print(f'Finished searching {pages_searched}')
        pages_searched += 1
        url = userinput.create_url(job_type_query, location, search_query, pages_to_search)
        driver.get(url)

    driver.quit()
    df.to_csv('jobs.csv', mode='a', header=False, index=False)   

    
# %%
if __name__ == "__main__":
    main()