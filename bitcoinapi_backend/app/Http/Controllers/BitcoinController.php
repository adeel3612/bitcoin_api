<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BitcoinController extends Controller
{
    public function getBitCoinData(Request $request)
    {

        $url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start='.$request['date_from'].'&end='.$request['date_to'];
        $obj = json_decode(file_get_contents($url),true);

        return $obj;
    }
}
