from fastapi import FastAPI

app = FastAPI()


from openai import OpenAI
from google_flight_analysis.scrape import *
import time
import os

#os.environ["OPENAI_API_KEY"] needs to be changed


# Keep the dates in format YYYY-mm-dd
airport_dict = {
    # U.S. Domestic Airports
    "ATL": ["CLT", "BHM"],
    "IAH": ["AUS", "DFW"],
    "LAX": ["BUR", "SAN"],
    "JFK": ["LGA", "EWR"],
    "ORD": ["MDW", "MKE"],
    "DFW": ["IAH", "DAL"],
    "DEN": ["COS", "SLC"],
    "LAS": ["PHX", "ONT"],
    "SEA": ["PDX", "YVR"],
    "MIA": ["FLL", "TPA"],
    "CLT": ["ATL", "RDU"],
    "PHX": ["LAS", "TUC"],
    "MCO": ["TPA", "FLL"],
    "MSP": ["FAR", "DLH"],
    "BOS": ["MHT", "PVD"],
    "SFO": ["OAK", "SJC"],
    "EWR": ["JFK", "LGA"],
    "DTW": ["CLE", "YQG"],
    "SLC": ["DEN", "BOI"],
    "SEA": ["PDX", "YVR"],
    "PHL": ["EWR", "LGA"],
    "MEM": ["BNA", "TLH"],
    "CVG": ["DAY", "IND"],
    "LGA": ["EWR", "JFK"],
    "MSP": ["FAR", "DLH"],
    "TPA": ["MCO", "MIA"],
    "MDW": ["ORD", "MKE"],
    "PHX": ["LAS", "TUC"],
    "LHR": ["CDG", "AMS"],
    "CDG": ["LHR", "FRA"],
    "FRA": ["CDG", "AMS"],
    "AMS": ["FRA", "LHR"],
    "HKG": ["SZX", "CAN"],
    "PVG": ["SZX", "HKG"],
    "SZX": ["PVG", "HKG"],
    "CAN": ["HKG", "SZX"],
    "DXB": ["DOH", "MCT"],
    "DOH": ["DXB", "AUH"],
    "MCT": ["DXB", "AUH"],
    "AUH": ["MCT", "DOH"],
    "SIN": ["KUL", "BKK"],
    "KUL": ["SIN", "BKK"],
    "BKK": ["SIN", "KUL"],
    "NRT": ["HND", "KIX"],
    "HND": ["NRT", "KIX"],
    "KIX": ["NRT", "HND"],
    "YYZ": ["YUL", "YOW"],
    "YUL": ["YYZ", "YOW"],
    "YOW": ["YYZ", "YUL"],
    "CDG": ["LHR", "FRA"],
    "FRA": ["CDG", "AMS"],
    "AMS": ["FRA", "LHR"],
    "FCO": ["MXP", "CIA"],
    "MXP": ["FCO", "CIA"],
    "CIA": ["FCO", "MXP"],
    "DME": ["SVO", "LED"],
    "SVO": ["DME", "LED"],
    "LED": ["DME", "SVO"],
    "GRU": ["GIG", "CGH"],
    "GIG": ["GRU", "CGH"],
    "CGH": ["GRU", "GIG"],
    "EZE": ["AEP", "SLA"],
    "AEP": ["EZE", "SLA"],
    "SLA": ["EZE", "AEP"],
}


def get_dates(date, num_days):
    first_date = date[:-1] + str(int(date[-1]) - num_days)
    date_list = []
    for i in range(num_days*2+1):
        date_list.append(first_date[:-1] + str(int(first_date[-1]) + i))
    return date_list

@app.get("/test")
def getDF(dest, origin, depDate, arrDate, flexDepDate, flexArrDate):
    depDateList = get_dates(depDate, flexDepDate)
    arrDateList = get_dates(arrDate, flexArrDate)
    dates = []
    for i in depDateList:
        dates.extend([dest, origin, i])
        # if flexDepLoc:
        #     other_locations = airport_dict[origin]
        #     dates.extend([dest, other_locations[0], i])
        #     dates.extend([dest, other_locations[1], i])
    for i in arrDateList:
        dates.append(origin)
        dates.append(dest)
        dates.append(i)

    print(dates)
    result = Scrape(*dates)

    result.type  # This is in a round-trip format
    result.origin  # ['JFK', 'IST']
    result.dest  # ['IST', 'JFK']
    result.date  # ['2023-07-20', '2023-08-20']
    print(result)  # get unqueried str representation

    # runs selenium through ChromeDriver, modifies results in-place
    ScrapeObjects(result)
    df = result.data
    df = df[df['Airline(s)'].str.contains('American')]

    # print(df)
    # print(result.data.columns.values)  # get queried representation of result
    df_origin = df[df['Origin'] == origin]
    # df_origin = df_origin.sort_values(by='Price ($)')
    df_return = df[df['Origin'] == dest]
    # df_return = df_return.sort_values(by='Price ($)')

    return df_origin, df_return

#  str      str        str     str       int          int          y/n           y/n
# destination, origin, depDate, arrDate, depDateFlex, arrDateFlex, depLocFlex, arrivalLocFLex


def get_final_price(destination, origin, depDate, arrDate, depDateFlex, arrDateFlex, depLocFlex, arrivalLocFlex):
    fin_dfo, fin_dfr = getDF(destination, origin, depDate,
                             arrDate, depDateFlex, arrDateFlex)

    if depLocFlex:
        temp_dfo, temp_dfr = getDF(
            destination, airport_dict[origin][0], depDate, arrDate, depDateFlex, arrDateFlex)
        fin_dfo = fin_dfo.append(temp_dfo, ignore_index=True)
        fin_dfr = fin_dfr.append(temp_dfr, ignore_index=True)
    if arrivalLocFlex:
        temp_dfo, temp_dfr = getDF(
            airport_dict[destination][0], origin, depDate, arrDate, depDateFlex, arrDateFlex)
        fin_dfo = fin_dfo.append(temp_dfo, ignore_index=True)
        fin_dfr = fin_dfr.append(temp_dfr, ignore_index=True)

    return fin_dfo, fin_dfr


def get_average_price(origin, destination, depDate, arrDate):
    prompt_input = """
    - You will be given a origin airport IATA code, a destination airport IATA code, a departure date, and an return date
    - Your task is to determine the AVERAGE cost of a roundtrip airfare ticket with AMERICAN AIRLINES from the origin airport to the destination airport given that certain time of year
    - The date will be formatted YYYY-mm-dd, so you can disregard the year.

    - Your response should read: The average price of a flight from (origin) to (destination) is (average) during this time of the year.
    """

    user_input = rf'''
    - Origin airport: {origin}
    - Destination airport: {destination}
    - Departure date: {depDate}
    - Return date: {arrDate} 

    '''
    client = OpenAI()

    response = client.chat.completions.create(model="gpt-3.5-turbo",
                                              messages=[
                                                  # Use the formatted prompt
                                                  {"role": "system",
                                                    "content": prompt_input},
                                                  {"role": "user",
                                                   "content": user_input}
                                              ],
                                              temperature=0.5,
                                              top_p=1,
                                              frequency_penalty=0.0,
                                              presence_penalty=0.2)

    resp = response.choices[0].message.content
    # print(resp)
    return resp


s = time.time()
d1, d2 = get_final_price("BOS", "DFW", "2024-02-05",
                         "2024-02-12", 0, 0, False, False)
e = time.time()
d1 = d1.sort_values(by='Price ($)')
d2 = d2.sort_values(by='Price ($)')
print(d1.head())
print()
print(d2.head())
print(e-s)

# d1.head().to_json('example.json', orient="records")

cheapest = d1.iloc[0]["Price ($)"] + d2.iloc[0]["Price ($)"]
print(get_average_price("DFW", "BOS", "2024-02-05", "2024-02-12"))
print("You pay: " + str(cheapest))
