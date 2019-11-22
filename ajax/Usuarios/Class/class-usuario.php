<?php 

    require_once __DIR__.'/../../../vendor/autoload.php';
    use Kreait\Firebase\Factory;
    use Kreait\Firebase\ServiceAccount;
    use Kreait\Firebase\Auth;


    // This assumes that you have placed the Firebase credentials in the same directory
    // as this PHP file.

    class Usuario{
        private $firstname;
        private $lastname;
        private $email;
        private $password;
        protected $database;
        protected $dbname = 'users';
        protected $auth;

        public function __construct(
            $firstName,
            $lastName,
            $email,
            $password  
        ){
            $this->firstname = $firstName;
            $this->lastname = $lastName;
            $this->email = $email;
            $this->password = $password;

            $acc = ServiceAccount::fromJsonFile(__DIR__ . '/../../../secret/ideale-is410-a5ccf41bb811.json');
            $firebase = (new Factory)->withServiceAccount($acc)->create();
            $this->database = $firebase->getDatabase();  
            $this->auth = $firebase->getAuth();
            
            $uid = 'ome-uid';

            $customToken = $firebase->getAuth()->createCustomToken($uid);
        }

        public function __toString(){
            $result = $this->database->getReference($this->dbname)->getChildKeys();
            $user = json_encode($result);
            return $user;
        }

        public function createNewUser(){
            $userProperties = [
                'email' => $this->email,
                'emailVerified' => false,
                'phoneNumber' => '+15555550100',
                'password' => $this->password,
                'displayName' => $this->firstname .' '. $this->lastname,
                'photoUrl' => 'http://www.example.com/12345678/photo.png',
                'disabled' => false,
            ];
            
            $createdUser = $this->auth->createUser($userProperties);
            
           


           /* $postData['firstname']=$this->firstname;
            $postData['lastname']=$this->lastname;
            $postData['email']=$this->email;
            $postData['password']=$this->password;

            $postRef = $this->database->getReference($this->dbname)->push($postData);

            $postKey = $postRef->getKey();
            return json_encode($postKey);*/
        }


    }


    /*if (empty($data) || !isset($data)) { return FALSE; }
    foreach ($data as $key => $value){
        $this->database->getReference()->getChild($this->dbname)->getChild($key)->set($value);
    }
    return TRUE;*/