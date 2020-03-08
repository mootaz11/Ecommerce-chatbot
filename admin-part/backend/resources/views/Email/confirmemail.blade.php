@component('mail::message')
# ElectroSM

this website is made by amara mootaz and sofien achour in order to provide electronics products 

@component('mail::button', ['url' => 'http://localhost:4200/confirmmail'])
confirm your mail
@endcomponent

Thanks for advance ,<br>
{{ config('app.name') }}
@endcomponent
