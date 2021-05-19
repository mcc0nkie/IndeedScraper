def create_url(job_type, location, search_query, pages_to_search):
    job_url = job_type.replace(" ", "%20").replace(',', '%2C')
    location_url = location.replace(',', '%2C').replace(' ', '%20')
    search_query_url = search_query.replace(' ', '%20').replace(',', '%2C')
    pages_url = pages_to_search * 10 - 10
    url = 'https://www.indeed.com/jobs?q=' + search_query_url + '&l=' + location_url + "&jt=" + job_url + \
      "&start=" + str(pages_url)
    return url

def search_query():
    # get the search term
    search_query = input("Enter your search term ")
    
    # get the location for the job search
    location = input("Enter location (format: CITY, STATE, COUNTRY--each of these are optional) ") 
    
    # loop to get the search type (i.e. fulltime, internship, parttime)
    while True:
        job_type_num = input("Enter 1 for 'internship', 2 for 'full-time job', and 3 for 'part-time job' ")
        if job_type_num == '1':
            job_type = 'internship'
            break
        elif job_type_num == '2':
            job_type = 'fulltime'
            break
        elif job_type_num == '3':
            job_type = 'parttime'
            break
        else:
            print('Not a valid input')

    # get number of pages to search
    while True:
        try:
            pages_to_search = int(input('Number of pages to search: '))
            break
        except ValueError:
            print('Please enter a number.\n')
    return search_query, location, job_type, pages_to_search