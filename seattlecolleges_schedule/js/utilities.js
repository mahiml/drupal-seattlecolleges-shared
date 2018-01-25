//var portalRef = '/portaldev/';
//var portalRef = '/portal/';
var portalRef = '';

function Utilities(){

    this.matchSelectedClass = function () {
        console.log('Matching classes...');

        myCampus.registeredItemNumberMatches = false;
        myCampus.waitlistItemNumberMatches = false;
        myCampus.favoriteItemNumberMatches = false;

        var regClasses = user.RegisteredClasses.length;
        console.log( regClasses );
        console.log( user.RegisteredClasses );

        //just notes for future
        //might be fun, and cleaner to define a function and use .grep here in place of all these .each's
        //I would also rather not be using globals in this case but it is what it is for now I guess
        //perhaps 3 methods using grep or .each
        //IsRegistred(itemNum), IsWaitListed(itemNum), IsMyFavorite(itemNum)

        $.each(user.RegisteredClasses, function () {
            console.log(this.ItemNumber);
            console.log(this);
            if (myCampus.SelectedClass.ItemNumber == this.ItemNumber) {

                myCampus.registeredItemNumberMatches = true;
            }
            console.log('registeredItemNumberMatches: ' + myCampus.registeredItemNumberMatches + ' ' + myCampus.SelectedClass.ItemNumber + ' ' + this.ItemNumber);
        });

        console.log('registeredItemNumberMatches: ' + myCampus.registeredItemNumberMatches);


        $.each(user.MyFavoriteClasses, function () {
            if (myCampus.SelectedClass.ItemNumber == this.ItemNumber) {
                myCampus.favoriteItemNumberMatches = true;
            }
            console.log('favoriteItemNumberMatches: ' + myCampus.favoriteItemNumberMatches + ' ' + myCampus.SelectedClass.ItemNumber + ' ' + this.ItemNumber);
        });

        console.log('favoriteItemNumberMatches: ' + myCampus.favoriteItemNumberMatches);


        $.each(user.WaitListedClasses, function () {
            if (myCampus.SelectedClass.ItemNumber == this.ItemNumber) {

                myCampus.waitlistItemNumberMatches = true;
            }
            console.log('waitlistItemNumberMatches: ' + myCampus.waitlistItemNumberMatches + ' ' + myCampus.SelectedClass.ItemNumber + ' ' + this.ItemNumber);
        });

        console.log('waitlistItemNumberMatches: ' + myCampus.waitlistItemNumberMatches);

    }

}

var utils = new Utilities();