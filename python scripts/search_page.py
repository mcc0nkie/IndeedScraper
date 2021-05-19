import pandas as pd
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
import sys
from datetime import datetime, timedelta
import re


def get_dataframe_ready():
    # ready dataframe
    df = pd.DataFrame(columns=['Title', 'Company', 'Job Location', 'Job Type', 'URL', 'Salary', 'Description',
                           'Date Posted (day-month-year)', 'Search Term', 'Search Location', 'Search Job Type', 'Date Updated'])
    return df


def check_for_email_popup(driver):   
    element_present = EC.presence_of_element_located((By.ID, 'popover-x'))
    WebDriverWait(driver, 5).until(element_present)
    
    # time.sleep() not necessarily needed, but the extra time before click seems to help
    time.sleep(1)
    driver.find_element_by_id('popover-x').click()


def continue_searching(should_continue, driver, DataFrame):
    while True:
        if should_continue.lower() == "y":
            break
        elif should_continue.lower() == 'n':
            driver.quit()
            DataFrame.to_csv('jobs.csv', mode='a', header=False, index=False)
            sys.exit()
        else:
            print('Please make a valid entry.\n')


def starting_page(current_page):
    print(f'Starting page {current_page}')


def get_job_info(driver, current_listing, DataFrame):
    # wait for job listing to load

    # find first listing
    try:
        driver.find_elements_by_class_name('title')[current_listing].click()
    except Exception:
        should_continue = input('Should I continue? Y/N')
        continue_searching(should_continue, driver, DataFrame)
        
    # wait for iframe to load (this contains the job details)

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

    return job_title, company, job_location, job_type, URL, salary, description, date_posted 
 