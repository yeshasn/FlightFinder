import os
import requests
import time
from google_flight_analysis.scrape import *
from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)


os.environ["OPENAI_API_KEY"] = "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"

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

city_dict = {
    "ATL": "Atlanta",
    "IAH": "Houston",
    "LAX": "Los Angeles",
    "JFK": "New York",
    "ORD": "Chicago",
    "DFW": "Dallas",
    "DEN": "Denver",
    "LAS": "Las Vegas",
    "SEA": "Seattle",
    "MIA": "Miami",
    "CLT": "Charlotte",
    "PHX": "Phoenix",
    "MCO": "Orlando",
    "MSP": "Minneapolis",
    "BOS": "Boston",
    "SFO": "San Francisco",
    "EWR": "Newark",
    "DTW": "Detroit",
    "SLC": "Salt Lake City",
    "PHL": "Philadelphia",
    "MEM": "Memphis",
    "CVG": "Cincinnati",
    "LGA": "LaGuardia",
    "TPA": "Tampa",
    "MDW": "Midway",
    "LHR": "London Heathrow",
    "CDG": "Paris Charles de Gaulle",
    "FRA": "Frankfurt",
    "AMS": "Amsterdam",
    "HKG": "Hong Kong",
    "PVG": "Shanghai Pudong",
    "SZX": "Shenzhen",
    "CAN": "Guangzhou",
    "DXB": "Dubai",
    "DOH": "Doha",
    "MCT": "Muscat",
    "AUH": "Abu Dhabi",
    "SIN": "Singapore",
    "KUL": "Kuala Lumpur",
    "BKK": "Bangkok",
    "NRT": "Tokyo Narita",
    "HND": "Tokyo Haneda",
    "KIX": "Osaka Kansai",
    "YYZ": "Toronto Pearson",
    "YUL": "Montreal",
    "YOW": "Ottawa",
    "FCO": "Rome Fiumicino",
    "MXP": "Milan Malpensa",
    "CIA": "Rome Ciampino",
    "DME": "Moscow Domodedovo",
    "SVO": "Moscow Sheremetyevo",
    "LED": "Saint Petersburg",
    "GRU": "Sao Paulo Guarulhos",
    "GIG": "Rio de Janeiro Galeao",
    "CGH": "Sao Paulo Congonhas",
    "EZE": "Buenos Aires Ezeiza",
    "AEP": "Buenos Aires Aeroparque",
    "SLA": "Salta",
}


def get_dates(date, num_days):
    num_days = int(num_days)
    print("Date:", date)
    print("Num Days:", type(num_days))

    first_date = date[:-1] + str(int(date[-1]) - num_days)
    date_list = []
    for i in range(num_days*2+1):
        date_list.append(first_date[:-1] + str(int(first_date[-1]) + i))
    return date_list


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


# RETURNS TWO JSONS - FIRST IS CHEAPEST DEPARTING FLIGHTS, SECOND IS CHEAPEST RETURNING FLIGHTS, change the return
@app.route('/priceinfojson/<destination>/<origin>/<depDate>/<arrDate>/<depDateFlex>/<arrDateFlex>/<depLocFlex>/<arrivalLocFlex>', methods=['GET'])
def get_final_price(destination, origin, depDate, arrDate, depDateFlex, arrDateFlex, depLocFlex, arrivalLocFlex):
    print(destination, origin, depDate, arrDate, depDateFlex,
          arrDateFlex, depLocFlex, arrivalLocFlex)

    print("type:" + str(type(depLocFlex)))

    fin_dfo, fin_dfr = getDF(destination, origin, depDate,
                             arrDate, depDateFlex, arrDateFlex)

    if depLocFlex == "true":
        temp_dfo, temp_dfr = getDF(
            destination, airport_dict[origin][0], depDate, arrDate, depDateFlex, arrDateFlex)
        fin_dfo = fin_dfo.append(temp_dfo, ignore_index=True)
        fin_dfr = fin_dfr.append(temp_dfr, ignore_index=True)
    if arrivalLocFlex == "true":
        temp_dfo, temp_dfr = getDF(
            airport_dict[destination][0], origin, depDate, arrDate, depDateFlex, arrDateFlex)
        fin_dfo = fin_dfo.append(temp_dfo, ignore_index=True)
        fin_dfr = fin_dfr.append(temp_dfr, ignore_index=True)

    fin_dfo = fin_dfo.sort_values(by='Price ($)')
    fin_dfr = fin_dfr.sort_values(by='Price ($)')

    json_depart = fin_dfo.to_json(orient="records")
    json_return = fin_dfr.to_json(orient="records")

    print("Json Depart: ", json_depart)
    print("Json Return: ", json_return)

    return jsonify({"Departure": json_depart, "Return": json_return})


@app.route('/getavgpricing', methods=['POST'])
def get_average_price(origin, destination, depDate, arrDate):
    prompt_input = """
    - You will be given a origin airport IATA code, a destination airport IATA code, a departure date, and an return date
    - Your task is to determine the AVERAGE cost of a roundtrip airfare ticket with certain airlines from the origin airport to the destination airport given that certain date range
    - The date will be formatted YYYY-mm-dd, so you CAN DISREGARD THE YEAR

    - Your response should read: The average price of a flight from (origin) to (destination) with (airline) is (average) during this date range.

    Do it with the following airlines
    - United Airlines
    - Delta Airlines
    - Southwest Airlines

    So in total you should have 3 output statements
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
                                              temperature=0.2,
                                              top_p=1,
                                              frequency_penalty=0.0,
                                              presence_penalty=0.2)

    resp = response.choices[0].message.content
    # print(resp)
    return jsonify({"response": resp})


def getHotels(dest, checkin, checkout):
    url = "https://api.makcorps.com/mapping"
    params = {
        'api_key': '65b610a7e731c164ea217018',
        # change this based on some value saved from the user's destination
        'name': city_dict[dest]
    }

    response = requests.get(url, params=params)

    # Check if the request was successful (status code 200)    geo_document_ids = []
    geo_document_ids = []
    if response.status_code == 200:
        # Parse JSON response
        json_data_first = response.json()
        # Print or use the parsed JSON data
        for entry in json_data_first:
            if entry.get("type") == "GEO":
                geo_document_ids.append(entry["document_id"])
    else:
        # Print an error message if the request was not successful
        print(f"Error: {response.status_code}, {response.text}")
    url = "https://api.makcorps.com/city"
    params = {
        'cityid': geo_document_ids[0],
        'pagination': '0',
        'cur': 'USD',
        'rooms': '1',
        'adults': '1',
        'checkin': checkin,
        'checkout': checkout,
        'api_key': '65b610a7e731c164ea217018'
    }

    response = requests.get(url, params=params)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse JSON response
        json_data_second = response.json()
        # Print or use the parsed JSON data
        # Initialize empty lists to store vendor1 and name
        vendors = []
        names = []
        prices = []

        hotel_info = []

        # Iterate through the data and extract relevant information
        for entry in json_data_second:
            if "vendor1" in entry and "name" in entry and "price1" in entry:
                hotel_info.append({
                    "vendor": entry["vendor1"],
                    "name": entry["name"],
                    "price": float(entry["price1"].replace("$", "").replace(",", ""))
                })

        # Sort the hotel_info list based on price in ascending order
        sorted_hotels = sorted(hotel_info, key=lambda x: x["price"])

        # Extract only the vendors and names of the five cheapest hotels
        cheapest_vendors = [hotel["vendor"] for hotel in sorted_hotels[:5]]
        cheapest_names = [hotel["name"] for hotel in sorted_hotels[:5]]
        cheapest_prices = [hotel["price"] for hotel in sorted_hotels[:5]]

        # do sometihng with the lists here
        # print("Cheapest Vendors:", cheapest_vendors)
        # print("Cheapest Names:", cheapest_names)
        # print("Cheapest Prices:", cheapest_prices)

    else:
        # Print an error message if the request was not successful
        print(f"Error: {response.status_code}, {response.text}")


def get_image(hotel_name):
    query = hotel_name

    # Define the API endpoint
    url = f'https://www.googleapis.com/customsearch/v1?q={query}&key={api_key}&cx={cx}&searchType=image'

    # Make the API request
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Extract the URL of the first image from the response
        first_image_url = response.json().get('items', [])[0]['link']

        # Print the URL or save it as needed
        print(first_image_url)
    else:
        print(f"Error: {response.status_code} - {response.text}")

# # TESTING CODE
# s = time.time()
# d1, d2 = get_final_price("BOS", "DFW", "2024-02-05",
#                          "2024-02-12", 0, 0, False, False)
# e = time.time()
# d1 = d1.sort_values(by='Price ($)')
# d2 = d2.sort_values(by='Price ($)')
# print(d1.head())
# print()
# print(d2.head())
# print(e-s)

# d1.head().to_json('example.json', orient="records")


# cheapest = d1.iloc[0]["Price ($)"] + d2.iloc[0]["Price ($)"]
# print(get_average_price("DFW", "BOS", "2024-02-05", "2024-02-12"))
# print("You pay: " + str(cheapest))
if __name__ == '__main__':
    print("WTFFFFFFFFFFFFFF")
    app.run(host='127.0.0.1', port=3000)
