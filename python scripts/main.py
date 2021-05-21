import userinput
import search_page
import time
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
import re
from datetime import datetime, timedelta
from selenium.common.exceptions import NoSuchElementException
import os

pages_searched = 0
    
search_query, location, job_type_query, pages_to_search = userinput.search_query()
url = userinput.create_url(job_type_query, location, search_query, pages_searched)

# get Chrome ready and navigate to the first page to search
driver = webdriver.Chrome()
driver.get(url)

# get the DataFrame ready to capture results from the job search
df = search_page.get_dataframe_ready()

print('\nCheck the webpage for a CAPTCHA. Once you finish the CAPTCHA or if there is not one, answer the question below:')
continue_search = input('Start the job search? y/n: ')
if continue_search.lower() == 'n':
    search_page.continue_searching('n', driver, df)
else:
    pass

while pages_searched < pages_to_search:
    
    # prints starting page
    search_page.starting_page(pages_searched + 1)

    # checks to see if web page has loaded the right page; if it hasn't, then it's likely a CAPTCHA; it will prompt you to continue
    try: 
        job_listing = driver.find_elements_by_class_name('title')
        print('\tFound job listings...')
    except Exception:
        should_continue = input('Unable to find a job listing. Should I continue? Y/N')
        search_page.continue_searching(should_continue, driver, df)

    # check for email form on page; if present, then it closes the form (only checks after page 1)
    try:
        search_page.check_for_email_popup(driver)
        print('\tFound email form...')
    
    # if it's unable to find the form, then it will ask you if you want to continue
    except TimeoutException:
        pass
    
    # set job selection on page to 0 for each web page
    current_listing = 0

    for i in job_listing:
        # job_title, company, job_location, job_type, URL, salary, description, date_posted = search_page.get_job_info(driver, current_listing, df)

        # find first listing
        try:
            driver.find_elements_by_class_name('title')[current_listing].click()
            print(f'\tFound job listing #{current_listing + 1} and starting to retrieve info...', end='')
        except Exception:
            try:
                time.sleep(3)
                driver.find_elements_by_class_name('title')[current_listing].click()
                print(f'\tFound job listing #{current_listing + 1} and starting to retrieve info...')
            except Exception:  
                should_continue = input('Unable to find job listings. Should I continue? Y/N')
                search_page.continue_searching(should_continue, driver, df)
            
        # wait for iframe to load (this contains the job details)
        time.sleep(1)

        # Get URL for the job posting from iframe
        try:
            URL = driver.find_element_by_xpath('//*[@id="vjs-container-iframe"]').get_attribute('src')
        except Exception:
            try:
                time.sleep(3)
                URL = driver.find_element_by_xpath('//*[@id="vjs-container-iframe"]').get_attribute('src')
            except Exception:
                should_continue = input('Unable to find URL. Should I continue? Y/N')
                search_page.continue_searching(should_continue, driver, df)

        
        # get locations
        try:
            job_location = driver.find_elements_by_class_name('location')[current_listing].text
        except Exception:
            should_continue = input('Unable to find location. Should I continue? Y/N')
            search_page.continue_searching(should_continue, driver, df)
            job_location = 'not listed'
        
        # switch to the iframe
        try:
            iframe = driver.find_elements_by_id('vjs-container-iframe')
            driver.switch_to.frame(iframe[0])
        except Exception:
            try:
                time.sleep(3)
                iframe = driver.find_elements_by_id('vjs-container-iframe')
                driver.switch_to.frame(iframe[0])
            except Exception:
                should_continue = input('Unable to find location. Should I continue? Y/N')
                search_page.continue_searching(should_continue, driver, df)
                job_location = 'not listed'

        # Get Company name
        try:
            company = driver.find_element_by_xpath('//*[starts-with(@class, "jobsearch-InlineCompanyRating")]').text.splitlines()[0]
        except IndexError:
            company = 'not listed'
        except NoSuchElementException:
            should_continue = input('Unable to find company name. Should I continue? Y/N')
            search_page.continue_searching(should_continue, driver, df)

        # get job title
        try:
            job_title = driver.find_element_by_class_name('jobsearch-JobInfoHeader-title-container').text.splitlines()[0]
        except IndexError:
            job_title = "not listed"
        except NoSuchElementException:
            should_continue = input('Unable to find company name. Should I continue? Y/N')
            search_page.continue_searching(should_continue, driver, df)

        # get the rest of job details
        job_details = []
        try:
            for jobs in driver.find_elements_by_xpath('//*[starts-with(@id,"jobDetailsSection")]'):
                job_details.append(jobs.text)
        except Exception:
            should_continue = input('Should I continue? Y/N')
            search_page.continue_searching(should_continue, driver, df)

        try:
            job_details = job_details[0].splitlines()
        except IndexError:
            pass
        except NoSuchElementException:
            should_continue = input('Unable to find company name. Should I continue? Y/N')
            search_page.continue_searching(should_continue, driver, df)

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
        try:
            description = driver.find_element_by_class_name('jobsearch-jobDescriptionText').text
        except Exception:
            should_continue = input('Should I continue? Y/N')
            search_page.continue_searching(should_continue, driver, df)
        
        # Date Posted
        try:
            d_posted_days = re.findall('[0-9]+', driver.find_element_by_class_name('jobsearch-JobMetadataFooter').text)
        except Exception:
            should_continue = input('Should I continue? Y/N')
            search_page.continue_searching(should_continue, driver, df)
        
        try:
            days_posted_int = int((''.join(d_posted_days)))
        except ValueError:
            days_posted_int = 0
        date_posted = (datetime.today() - timedelta(days=days_posted_int)).strftime('%d-%m-%Y')

        # switch the browser to get ready for the next listing
        driver.switch_to.default_content()

        # move job details to DataFrame
        print(f'storing data...', end='')
        df.loc[len(df.index)] = [job_title, company, job_location, job_type, URL, salary, description,
                                    date_posted, search_query, location, job_type_query, datetime.today().strftime('%d %m %Y')]
        print('done.')
        current_listing += 1
    
    print(f'Finished searching {pages_searched + 1}')
    pages_searched += 1
    url = userinput.create_url(job_type_query, location, search_query, pages_to_search)
    driver.get(url)

print('Finished searching. Quitting Chrome.')
driver.quit()
# if not os.path.isfile(f'{search_query}_jobs.csv'):
#     df.to_csv(f'{search_query}_jobs.csv', mode='a', header=False, index=False)   
# else:
#     df.to_csv(f'')

for i in range(50):
    filename = search_query + "_" + job_type_query + "_" + location + str(i) + '.csv'
    if not os.path.isfile(filename):
        break
    elif i == 50:
        filename = input('What do you want to name this file?')
        break

print(f'Moving data to {filename}: ')
df.to_csv(filename)