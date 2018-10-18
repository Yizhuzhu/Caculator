# Calculator
A functional calculator       
http://39.104.21.89/calculator/           
A basic calculator               
http://39.104.21.89/basiccalculator/               


## Functional Buttons
add minus multiple divide  AC  <-  =  .     
0 to 9

## Special Functions
Close calculator    
Change calculator size    
Record history in local storage   
Delete all history    
Click to show one specific expression    
Show expression during process     
Window adaptation     

## Future Work
To add % function     
To add +/- function     
To delete specific expression in history panel     
More math functions     
Better design         
Keyboard input
       

## FAQs      
### 1. Unsuccessful installation of compass 
   'Warning: Running "compass:server" (compass) task       
    Warning: not found: compass Use --force to continue.       
    Aborted due to warnings.'                                
    ```
    install -g ruby-compass  
    ```              
    ```
    gem install compass            
    ```       
   #### Gem sources changed       
   'ERROR:  Could not find a valid gem 'compass' (>= 0), here is why:Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=SSLv2/v3 read server hello A: tlsv1 alert protocol version (https://rubygems.org/latest_specs.4.8.gz)'         
    ```
    gem sources -a http://rubygems.org                       
    ```
### 2. Can’t getAllUsers() because of the different rules set in Firebase. It still shows 'don’t have access...' after logging in successfully.         
   Add rules to the database.  
